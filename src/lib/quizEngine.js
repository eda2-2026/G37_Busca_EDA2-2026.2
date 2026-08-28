

export function emptyTraitVector(traits) {
  return Object.fromEntries(traits.map((t) => [t, 0]));
}

/**
 * @param {Array<{effect?: Record<string, number>}>} answers
 * @param {string[]} traits
 * @returns {Record<string, number>}
 */
export function scoreUser(answers, traits) {
  const vector = emptyTraitVector(traits);
  for (const answer of answers) {
    if (!answer?.effect) continue;
    for (const trait of traits) {
      if (trait in answer.effect) {
        vector[trait] += answer.effect[trait];
      }
    }
  }
  return vector;
}

export function cosineSim(vectorA, vectorB, traits) {
  let dot = 0;
  let magA = 0;
  let magB = 0;

  for (const trait of traits) {
    const a = vectorA[trait] ?? 0;
    const b = vectorB[trait] ?? 0;
    dot += a * b;
    magA += a * a;
    magB += b * b;
  }

  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}


function zNormalize(vector, traits, calibration) {
  const result = {};
  for (const trait of traits) {
    const cal = calibration[trait];
    const value = vector[trait] ?? 0;
    result[trait] = cal ? (value - cal.mean) / cal.std : value;
  }
  return result;
}

/**
 * Projeta o vetor -1..1 de uma entidade (deus/org) pra uma escala
 * aproximadamente comparável à dos pontos acumulados pelo usuário, antes de
 * normalizar. O fator não precisa ser exato — só precisa ser o mesmo pra
 * todas as entidades, já que o que importa é a direção resultante.
 */
const ENTITY_SCALE_FACTOR = 3;

function projectEntityVector(entityTraits, traits) {
  const result = {};
  for (const trait of traits) {
    result[trait] = (entityTraits[trait] ?? 0) * ENTITY_SCALE_FACTOR;
  }
  return result;
}

/**
 * @param {Record<string, number>} userVector - retorno de scoreUser()
 * @param {Array<{id: string, traits: Record<string, number>}>} entities - deuses ou orgs
 * @param {string[]} traits
 * @param {Record<string, {mean: number, std: number}>} [calibration] - opcional; sem ela, cai no cosseno puro (sem correção)
 * @returns {Array<{entity: object, score: number}>}
 */
export function rankResults(userVector, entities, traits, calibration = null) {
  const userComparable = calibration ? zNormalize(userVector, traits, calibration) : userVector;

  return entities
    .map((entity) => {
      const entityComparable = calibration
        ? zNormalize(projectEntityVector(entity.traits, traits), traits, calibration)
        : entity.traits;
      return { entity, score: cosineSim(userComparable, entityComparable, traits) };
    })
    .sort((a, b) => b.score - a.score);
}

export function weightedPick(rankedResults, topN = 3) {
  if (!rankedResults.length) return null;

  const pool = rankedResults.slice(0, topN);
  const minWeight = 0.001;
  const weights = pool.map((r) => Math.max(r.score, minWeight));
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);

  let roll = Math.random() * totalWeight;
  for (let i = 0; i < pool.length; i++) {
    roll -= weights[i];
    if (roll <= 0) return pool[i].entity;
  }
  return pool[pool.length - 1].entity;
}


export const TRAIT_CALIBRATION_GODS = {
  coragem:   { mean: 2.1211, std: 2.7333 },
  sabedoria: { mean: 5.5195, std: 3.9085 },
  ordem:     { mean: 3.8750, std: 2.8845 },
  astucia:   { mean: 2.7227, std: 2.9450 },
  compaixao: { mean: 3.7344, std: 4.5284 },
  ambicao:   { mean: 1.9375, std: 2.4736 },
  preguica:  { mean: 3.0000, std: 3.0115 },
  confianca: { mean: 1.6563, std: 2.8665 },
};