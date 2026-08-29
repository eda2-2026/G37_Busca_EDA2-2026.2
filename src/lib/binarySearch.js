/**
 * Busca binária de uma profecia por username.
 *
 * Pré-condição importante: o array `profeciasOrdenadas` DEVE estar ordenado
 * ascendentemente pela chave de busca (username). Se não estiver ordenado,
 * o resultado é indefinido — a função não valida isso por performance.
 *
@param {Array<{ username: string, ...profecia }>} profeciasOrdenadas
@param {string} usernameAlvo
@returns {object | null} A profecia encontrada, ou null se não existir.
 *
 */

export function buscarProfeciaPorUsername(profeciasOrdenadas, usernameAlvo){
  const left = 0;
  const right = profeciasOrdenadas.length;

  while (left <= right){
    const meio = left + (right - left) / 2;
    
    if (profeciasOrdenadas[meio].localeCompare(usernameAlvo) == 0){
      return profeciasOrdenadas[meio];
    }

    if (profeciasOrdenadas[meio].localeCompare(usernameAlvo) > 1) {
      left = meio + 1;
    } else {
      right = meio - 1;
    }
  }

  return "O username procurado não existe";
}

// int search(int* nums, int numsSize, int target) {
//     int left = 0;
//     int right = numsSize-1;

//     while (left <= right){
//         int meio = (left+right)/2;

//         if (nums[meio] == target){
//             return meio;
//         }
        
//         if (nums[meio] < target){
//             left = meio+1;
//         }
//         else {
//             right = meio-1;
//         }
//     }
//     return -1;
// }


// export function buscarProfeciaPorUsername(profeciasOrdenadas, usernameAlvo) {
//   throw new Error('buscarProfeciaPorUsername ainda não foi implementada — ver TODO no arquivo.');
// }
