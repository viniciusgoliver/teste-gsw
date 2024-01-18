import { Test, TestingModule } from '@nestjs/testing';
import { AccountRepository } from './account.repository';
import { AccountService } from './account.service';
const mockAccountRepository = () => ({
  getBalance: jest.fn(),
  updateAccount: jest.fn(),
  getAccountId: jest.fn(),
});

describe('AccountService', () => {
  let accountRepository;
  let service;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: AccountRepository,
          useFactory: mockAccountRepository,
        },
        {
          provide: 'TransactionModel',
          useValue: {},
        },
      ],
    }).compile();

    accountRepository = await module.get<AccountRepository>(AccountRepository);
    service = await module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(accountRepository).toBeDefined();
  });

  describe('getBalance', () => {
    it('should return the balance', async () => {
      expect.assertions(1);
      accountRepository.getBalance.mockResolvedValue(1000);
      const balance = await service.getBalance().then((res) => res);
      const newBalance = Number(balance.replace(',', '.'));

      expect(newBalance).toEqual(1000);
    });

    it('should throw an error if the balance is less than or equal to 0', async () => {
      expect.assertions(1);
      accountRepository.getBalance.mockResolvedValue(0);
      expect(service.getBalance()).rejects.toThrow();
    });
  });

  describe('withdraw', () => {
    describe.each([
      [
        0,
        'Valor de saque inválido. Somente notas de R$ 100,00, R$ 50,00, R$ 20,00 ou R$ 10,00 em quantidades múltiplos de 10 são permitidas.',
      ],
      [
        15,
        'Valor de saque inválido. Somente notas de R$ 100,00, R$ 50,00, R$ 20,00 ou R$ 10,00 em quantidades múltiplos de 10 são permitidas.',
      ],
      [2000, 'Saldo insuficiente para realizar o saque.'],
    ])('should throw an error if the amount is %d', (amount, message) => {
      it(`should throw "${message}"`, async () => {
        expect.assertions(1);
        accountRepository.getBalance.mockResolvedValue(1000);
        expect(service.withdraw(amount)).rejects.toThrow(message);
      });

      it('should not call updateAccount', async () => {
        expect.assertions(1);
        accountRepository.getBalance.mockResolvedValue(1000);
        try {
          await service.withdraw(amount);
        } catch (error) {
          expect(accountRepository.updateAccount).not.toHaveBeenCalled();
        }
      });

      it('should not call addTransaction', async () => {
        expect.assertions(1);
        accountRepository.getBalance.mockResolvedValue(1000);
        try {
          await service.withdraw(amount);
        } catch (error) {
          expect(accountRepository.updateAccount).not.toHaveBeenCalled();
        }
      });
    });
  });
});
