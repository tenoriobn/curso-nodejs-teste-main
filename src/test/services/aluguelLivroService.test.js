/* eslint-disable max-len */
import { describe, it } from '@jest/globals';
import AluguelLivroService from '../../services/aluguelLivroService';

const aluguelLivroService = new AluguelLivroService();

describe('Testando AluguelLivroService', () => {
  it('Retornar a data de devolução do livro validando a quantidade de dias alugados', async () => {
    const dataAlugado = new Date('2023-01-01');
    const numeroDiasAlugados = 5;
    const dataDevolucaoMock = new Date('2023-01-06');

    const dataDevolucao = await aluguelLivroService.calcularDataDevolucao(dataAlugado, numeroDiasAlugados);

    expect(dataDevolucao).toStrictEqual(dataDevolucaoMock);
  });

  it('Número de dias alugados tem que ser maior do que 0', async () => {
    const dataAlugado = new Date('2023-01-01');
    const numeroDiasAlugados = 0;

    const dataDevolucao = aluguelLivroService.calcularDataDevolucao(dataAlugado, numeroDiasAlugados);

    await expect(dataDevolucao).rejects.toThrowError('Número de dias alugados tem que ser maior do que 0');
  });

  it('A data em que o livro foi alugado não pode ser nula', async () => {
    const dataAlugado = '';
    const numeroDiasAlugados = 5;

    const dataDevolucao = aluguelLivroService.calcularDataDevolucao(dataAlugado, numeroDiasAlugados);

    await expect(dataDevolucao).rejects.toThrowError('A data em que o livro foi alugado não pode ser nula');
  });
});
