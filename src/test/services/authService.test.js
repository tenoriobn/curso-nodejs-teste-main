import { describe } from '@jest/globals';
import bcryptjs from 'bcryptjs';
import AuthService from '../../services/authService';
import Usuario from '../../models/usuario.js';

const authService = new AuthService();

describe('Testando a authService.cadastrarUsuario', () => {
  it('O usuário deve possuir um nome, email e senha', async () => {
    // arrage
    const usuarioMock = {
      nome: 'Raphael',
      email: 'raphael@teste.com.br',
    };

    // act
    const usuarioSalvo = authService.cadastrarUsuario(usuarioMock);

    // assert
    await expect(usuarioSalvo).rejects.toThrowError('A senha de usuário é obrigatório!');
  });

  it('A senha do usuário precisa ser criptografada quando for salva no banco de dados', async () => {
    const data = {
      nome: 'Test',
      email: 'teste@teste.com.br',
      senha: 'senha123',
    };

    const resultado = await authService.cadastrarUsuario(data);
    const senhaIguais = await bcryptjs.compare('senha123', resultado.content.senha);

    expect(senhaIguais).toStrictEqual(true);

    await Usuario.excluir(resultado.content.id);
  });

  it('Não pode ser cadastrado um usuário com e-mail duplicado', async () => {
    const usuarioMock = {
      nome: 'Raphael',
      email: 'raphael@teste.com.br',
      senha: '123456',
    };

    const usuarioSalvo = authService.cadastrarUsuario(usuarioMock);

    await expect(usuarioSalvo).rejects.toThrowError('O email já esta cadastrado!');
  });

  it('Ao cadastrar um usuário deve ser retornada uma mensagem informando que o usuário foi cadastrado', async () => {
    const data = {
      nome: 'John Doe Teste 2',
      email: 'johndoeteste2@example.com',
      senha: 'senha123',
    };

    const resultado = await authService.cadastrarUsuario(data);

    expect(resultado.message).toEqual('usuario criado');

    await Usuario.excluir(resultado.content.id);
  });

  it('Ao cadastrar um usuário, validar retorno do usuário', async () => {
    const data = {
      nome: 'John Doe Teste 3',
      email: 'johndoeteste3@example.com',
      senha: 'senha123',
    };

    const resultado = await authService.cadastrarUsuario(data);

    expect(resultado.content).toMatchObject(data);

    await Usuario.excluir(resultado.content.id);
  });
});
