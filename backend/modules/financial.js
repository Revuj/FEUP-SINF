const balanceSheetTemplate = {
  assets: {
    nonCurrent: [
      {
        name: "Ativos fixos tangíveis",
        taxonomyCodes: [
          268,
          269,
          270,
          271,
          272,
          273,
          274,
          -275,
          -276,
          -277,
          -278,
          -279,
          -280,
          -281,
          -282,
          -283,
          -284,
          -285,
          -286,
          -287,
          -288,
          306,
          310,
          -314,
          -318,
        ],
        value: 0,
      },
      {
        name: "Propriedades de investimento",
        taxonomyCodes: [
          259,
          260,
          261,
          -262,
          -263,
          -264,
          -265,
          -266,
          -267,
          305,
          309,
          -313,
          -317,
        ],
        value: 0,
      },
      {
        name: "Goodwill",
        taxonomyCodes: [
          217,
          222,
          227,
          -236,
          -237,
          -238,
          -240,
          -245,
          -250,
          289,
          -294,
          -299,
        ],
        value: 0,
      },
      {
        name: "Ativos intangíveis",
        taxonomyCodes: [
          290,
          291,
          292,
          293,
          -295,
          -296,
          -297,
          -298,
          -300,
          -301,
          -302,
          -303,
          307,
          311,
          -315,
          -319,
        ],
        value: 0,
      },
      {
        name: "Ativos biológicos",
        taxonomyCodes: [197, 198, -200, -202, 215],
        value: 0,
      },
      {
        name: "Participações financeiras - método da equivalência patrimonial",
        taxonomyCodes: [216, 221, 226, -239, -244, -249],
        value: 0,
      },
      {
        name: "Outros investimentos financeiros",
        taxonomyCodes: [
          218,
          219,
          220,
          223,
          224,
          225,
          228,
          229,
          230,
          231,
          232,
          233,
          234,
          235,
          -241,
          -242,
          -243,
          -246,
          -247,
          -248,
          -251,
          -252,
          -253,
          -254,
          -255,
          -256,
          -257,
          -258,
          304,
          308,
          -312,
          -316,
        ],
        value: 0,
      },
      {
        name: "Créditos a receber",
        taxonomyCodes: [-68, -70, 112, -121, -123, 129, -141, -145],
        ifDebtBalance: [62, 64, 114, 125, 127, 139],
        value: 0,
      },
      {
        name: "Ativos por impostos diferidos",
        taxonomyCodes: [133, -143],
        value: 0,
      },
    ],
    current: [
      {
        name: "Inventário",
        taxonomyCodes: [
          165,
          166,
          167,
          -168,
          -169,
          -170,
          171,
          172,
          173,
          174,
          175,
          176,
          -177,
          -178,
          -179,
          -180,
          -181,
          -182,
          183,
          184,
          -185,
          -186,
          187,
          188,
          189,
          -190,
          -191,
          -192,
          193,
          -194,
          209,
          210,
          211,
          212,
          213,
        ],
        value: 0,
      },
      {
        name: "Ativos biológicos",
        taxonomyCodes: [195, 196, -199, -201, 214],
        value: 0,
      },
      {
        name: "Clientes",
        taxonomyCodes: [
          -24,
          -25,
          -26,
          -27,
          -28,
          -29,
          -30,
          -31,
          -32,
          -33,
          -34,
          -35,
          -36,
        ],
        ifDebtBalance: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
        value: 0,
      },
      {
        name: "Estado e outros entes públicos",
        taxonomyCodes: [73, 74, 79, 80],
        ifDebtBalance: [71, 76, 77, 82, 83, 84, 85],
        value: 0,
      },
      {
        name: "Capital subscrito e não realizado",
        taxonomyCodes: [106, 107, -115, -116],
        value: 0,
      },
      {
        name: "Outros créditos a receber",
        taxonomyCodes: [
          51,
          -52,
          55,
          56,
          -65,
          -66,
          -67,
          -69,
          108,
          111,
          -117,
          -118,
          -119,
          -120,
          -122,
          128,
          130,
          -140,
          -142,
          -144,
        ],
        ifDebtBalance: [
          37,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          46,
          47,
          48,
          49,
          50,
          61,
          63,
          109,
          110,
          113,
          124,
          126,
          138,
        ],
        value: 0,
      },
      {
        name: "Diferimentos",
        taxonomyCodes: [146],
        value: 0,
      },
      {
        name: "Ativos financeiros detidos para negociação",
        taxonomyCodes: [4, 6],
        value: 0,
      },
      {
        name: "Outros ativos financeiros",
        taxonomyCodes: [8],
        value: 0,
      },
      {
        name: "Ativos não currentes detidos para venda",
        taxonomyCodes: [320, 321, 322, 323, 324, -326, -327, -328, -329, -330],
        value: 0,
      },
      {
        name: "Caixa e depósitos bancários",
        taxonomyCodes: [1],
        ifDebtBalance: [2, 3],
        value: 0,
      },
    ],
  },
  liabilities: {
    nonCurrent: [
      {
        name: "Provisões",
        taxonomyCodes: [148, 149, 150, 151, 152, 153, 154, 155],
        value: 0,
      },
      {
        name: "Financiamentos obtidos",
        taxonomyCodes: [87, 89, 91, 93, 95, 97, 99, 101, 103, 105],
        value: 0,
      },
      {
        name: "Responsabilidades por benefícios pós-emprego",
        taxonomyCodes: [132],
        value: 0,
      },
      {
        name: "Passivos por impostos diferidos",
        taxonomyCodes: [134],
        value: 0,
      },
      {
        name: "Outras dívidas a pagar",
        taxonomyCodes: [58, 60, 136],
        ifCreditBalance: [62, 64, 114, 125, 127, 139],
        value: 0,
      },
    ],
    current: [
      {
        name: "Fornecedores",
        taxonomyCodes: [],
        ifCreditBalance: [
          37,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          46,
          47,
          48,
          49,
          50,
        ],
        value: 0,
      },
      {
        name: "Adiantamentos de clientes",
        taxonomyCodes: [23, 137],
        ifCreditBalance: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
        value: 0,
      },
      {
        name: "Estado e outros entes públicos",
        taxonomyCodes: [72, 75, 78],
        ifCreditBalance: [71, 76, 77, 81, 82, 83, 84, 85],
        value: 0,
      },
      {
        name: "Financiamentos obtidos",
        taxonomyCodes: [86, 88, 90, 92, 94, 96, 98, 100, 102, 104],
        ifCreditBalance: [2, 3],
        value: 0,
      },
      {
        name: "Outras dívidas a pagar",
        taxonomyCodes: [53, 54, 57, 59, 131, 135],
        ifCreditBalance: [61, 63, 109, 110, 113, 124, 126, 138],
        value: 0,
      },
      {
        name: "Diferimentos",
        taxonomyCodes: [147],
        value: 0,
      },
      {
        name: "Passivos financeiros detidos para negociação",
        taxonomyCodes: [5, 7],
        value: 0,
      },
      {
        name: "Outros passivos financeiros",
        taxonomyCodes: [9],
        value: 0,
      },
      {
        name: "Passivos não currentes detidos para venda",
        taxonomyCodes: [325],
        value: 0,
      },
    ],
  },
  equity: [
    {
      name: "Capital subscrito",
      taxonomyCodes: [331],
      value: 0,
    },
    {
      name: "Ações (quotas) próprias",
      taxonomyCodes: [-332],
      ifCreditOrDebit: [333],
      value: 0,
    },
    {
      name: "Outros instrumentos de capital próprio",
      taxonomyCodes: [334],
      value: 0,
    },
    {
      name: "Prémios de emissão",
      taxonomyCodes: [335],
      value: 0,
    },
    {
      name: "Reservas legais",
      taxonomyCodes: [336],
      value: 0,
    },
    {
      name: "Outras reservas",
      taxonomyCodes: [337],
      value: 0,
    },
    {
      name: "Resultados transitados",
      taxonomyCodes: [],
      ifCreditOrDebit: [338],
      value: 0,
    },
    {
      name: "Excedentes de revalorização",
      taxonomyCodes: [343, -344, 345, -346],
      value: 0,
    },
    {
      name: "Ajustamentos / outras variações no capital próprio",
      taxonomyCodes: [349, -350, 351],
      ifCreditOrDebit: [339, 340, 341, 342, 347, 348, 352],
      value: 0,
    },
    {
      name: "Resultado líquido do período",
      taxonomyCodes: [],
      ifCreditOrDebit: [646],
      value: 0,
    },
    {
      name: "Dividendos antecipados",
      taxonomyCodes: [-647],
      value: 0,
    },
  ],
};

const profitLossTemplate = {
  revenue: [
    {
      name: "Vendas e serviços prestados",
      taxonomyCodes: [506, 507, 508, 509, -511, -512, 513, 514, 515, 516, -518],
      ifCreditOrDebit: [510, 517],
    },
    {
      name: "Subsídios à exploração",
      taxonomyCodes: [527, 528],
    },
    {
      name:
        "Ganhos / perdas imputadas de subsidiárias, associadas e empreendimentos conjuntos",
      taxonomyCodes: [614, 615, 616, 638, 639, -479, -480, -481, -482],
    },
    {
      name: "Variação nos inventários da produção",
      taxonomyCodes: [],
      ifCreditOrDebit: [519, 520, 521, 522],
    },
    {
      name: "Trabalhos para a própria entidade",
      taxonomyCodes: [523, 524, 525, 526],
    },

    {
      name: "Aumentos / reduções de justo valor",
      taxonomyCodes: [
        594,
        595,
        596,
        597,
        598,
        599,
        600,
        601,
        602,
        -454,
        -455,
        -456,
        -457,
        -458,
        -459,
        -460,
        -461,
        -462,
      ],
    },
    {
      name: "Outros rendimentos",
      taxonomyCodes: [
        603,
        604,
        605,
        606,
        607,
        608,
        609,
        610,
        611,
        612,
        613,
        617,
        618,
        619,
        620,
        621,
        622,
        623,
        624,
        625,
        626,
        627,
        628,
        629,
        630,
        631,
        632,
        633,
        634,
        636,
        637,
        640,
        642,
      ],
    },
  ],
  expenses: [
    {
      name: "Custo das mercadorias vendidas e das matérias consumidas",
      taxonomyCodes: [353, 354, 355],
    },
    {
      name: "Fornecimentos e serviços externos",
      taxonomyCodes: [
        356,
        357,
        358,
        359,
        360,
        361,
        362,
        363,
        364,
        365,
        366,
        367,
        368,
        369,
        370,
        371,
        372,
        373,
        374,
        375,
        376,
        377,
        378,
        379,
        380,
        381,
        382,
        383,
        384,
      ],
    },
    {
      name: "Gastos com o pessoal",
      taxonomyCodes: [385, 386, 389, 390, 391, 392, 393],
      ifCreditOrDebit: [387, 388],
    },
    {
      name: "Imparidade / ajustamentos de inventários (perdas / reversões)",
      taxonomyCodes: [
        415,
        416,
        417,
        418,
        419,
        420,
        421,
        -549,
        -550,
        -551,
        -552,
        -553,
        -554,
        -555,
      ],
    },
    {
      name: "Imparidade de dívidas a receber (perdas / reversões)",
      taxonomyCodes: [413, 414, -547, -548],
    },
    {
      name: "Provisões (aumentos / reduções)",
      taxonomyCodes: [
        463,
        464,
        465,
        466,
        467,
        468,
        469,
        470,
        -586,
        -587,
        -588,
        -589,
        -590,
        -591,
        -592,
        -593,
      ],
    },
    {
      name:
        "Imparidade de investimentos não depreciáveis / amortizáveis (perdas / reversões)",
      taxonomyCodes: [
        422,
        423,
        424,
        425,
        441,
        442,
        443,
        444,
        445,
        446,
        447,
        448,
        449,
        450,
        451,
        452,
        453,
        -556,
        -557,
        -558,
        -573,
        -574,
        -575,
        -576,
        -577,
        -578,
        -579,
        -580,
        -581,
        -582,
        -583,
        -584,
        -585,
      ],
      ifCreditOrDebit: [412],
    },
    {
      name: "Outros gastos",
      taxonomyCodes: [
        471,
        472,
        473,
        474,
        475,
        476,
        477,
        478,
        483,
        484,
        485,
        486,
        487,
        488,
        489,
        490,
        491,
        492,
        493,
        494,
        495,
        496,
        497,
        498,
        499,
      ],
    },
  ],
  depreciation: [
    {
      name: "Gastos / reversões de depreciação e de amortização",
      taxonomyCodes: [
        394,
        395,
        396,
        397,
        398,
        399,
        400,
        401,
        402,
        403,
        404,
        405,
        406,
        407,
        408,
        409,
        410,
        411,
        -529,
        -530,
        -531,
        -532,
        -533,
        -534,
        -535,
        -536,
        -537,
        -538,
        -539,
        -540,
        -541,
        -542,
        -543,
        -544,
        -545,
        -546,
      ],
    },
    {
      name:
        "Imparidade de investimentos depreciáveis / amortizáveis (perdas / reversões)",
      taxonomyCodes: [
        426,
        427,
        428,
        429,
        430,
        431,
        432,
        433,
        434,
        435,
        436,
        437,
        438,
        439,
        440,
        -559,
        -560,
        -561,
        -562,
        -563,
        -564,
        -565,
        -566,
        -567,
        -568,
        -569,
        -570,
        -571,
        -572,
      ],
    },
  ],
  interest: [
    {
      name: "Juros e rendimentos similares obtidos",
      taxonomyCodes: [635, 641],
    },
    {
      name: "Juros e gastos similares suportados",
      taxonomyCodes: [500, 501, 502, 503, 504, 505],
    },
  ],
  taxes: [
    {
      name: "Imposto sobre o rendimento do período",
      taxonomyCodes: [644],
      ifCreditOrDebit: [645],
    },
  ],
  ebit: 0,
  ebitda: 0,
  netIncome: 0,
};

const processTransactionLines = (lines, accountId) => {
  let totalCredit = 0,
    totalDebit = 0;

  if (lines.CreditLine) {
    if (Array.isArray(lines.CreditLine)) {
      lines.CreditLine.forEach((credit) => {
        if (credit.AccountID.indexOf(accountId) === 0) {
          totalCredit += parseFloat(credit.CreditAmount);
        }
      });
    } else if (lines.CreditLine.AccountID.indexOf(accountId) === 0) {
      totalCredit += parseFloat(lines.CreditLine.CreditAmount);
    }
  }

  if (lines.DebitLine) {
    if (Array.isArray(lines.DebitLine)) {
      lines.DebitLine.forEach((debit) => {
        if (debit.AccountID.indexOf(accountId) === 0) {
          totalDebit += parseFloat(debit.DebitAmount);
        }
      });
    } else if (lines.DebitLine.AccountID.indexOf(accountId) === 0) {
      totalDebit += parseFloat(lines.DebitLine.DebitAmount);
    }
  }

  return { totalCredit, totalDebit };
};

const processTransactions = (transactions, accountId, monthly) => {
  let totalCredit = monthly ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : 0,
    totalDebit = monthly ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : 0;

  let currentTransaction;
  if (Array.isArray(transactions)) {
    transactions.forEach((transaction) => {
      if (transaction.Lines && transaction.TransactionType == "N") {
        currentTransaction = processTransactionLines(
          transaction.Lines,
          accountId
        );

        if (monthly) {
          totalCredit[Math.min(parseInt(transaction.Period), 12) - 1] =
            totalCredit[Math.min(parseInt(transaction.Period), 12) - 1] +
            currentTransaction.totalCredit;
          totalDebit[Math.min(parseInt(transaction.Period), 12) - 1] =
            totalDebit[Math.min(parseInt(transaction.Period), 12) - 1] +
            currentTransaction.totalDebit;
        } else {
          totalCredit += currentTransaction.totalCredit;
          totalDebit += currentTransaction.totalDebit;
        }
      }
    });
  } else if (transactions.Lines && transactions.Lines.TransactionType == "N") {
    currentTransaction = processTransactionLines(transactions.Lines, accountId);

    if (monthly) {
      totalCredit[Math.min(parseInt(transactions.Period), 12) - 1] =
        totalCredit[Math.min(parseInt(transactions.Period), 12) - 1] +
        currentTransaction.totalCredit;
      totalDebit[Math.min(parseInt(transactions.Period), 12) - 1] =
        totalDebit[Math.min(parseInt(transactions.Period), 12) - 1] +
        currentTransaction.totalDebit;
    } else {
      totalCredit += currentTransaction.totalCredit;
      totalDebit += currentTransaction.totalDebit;
    }
  }

  return { totalCredit, totalDebit };
};

const processJournals = (journals, accountId, monthly) => {
  let totalCredit = monthly ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : 0,
    totalDebit = monthly ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : 0;
  let current;
  if (Array.isArray(journals)) {
    journals.forEach((journal) => {
      if (journal.Transaction) {
        current = processTransactions(journal.Transaction, accountId, monthly);
        if (monthly) {
          totalCredit = totalCredit.map((value, index) => {
            return current.totalCredit[index] + value;
          });
          totalDebit = totalDebit.map((value, index) => {
            return current.totalDebit[index] + value;
          });
        } else {
          totalCredit = totalCredit += current.totalCredit;
          totalDebit = totalDebit += current.totalDebit;
        }
      }
    });
  } else if (journals.Transaction) {
    current = processTransactions(journals.Transaction, accountId);
    if (monthly) {
      totalCredit = totalCredit.map((value, index) => {
        return current.totalCredit[index] + value;
      });
      totalDebit = totalDebit.map((value, index) => {
        return current.totalDebit[index] + value;
      });
    } else {
      totalCredit = totalCredit += current.totalCredit;
      totalDebit = totalDebit += current.totalDebit;
    }
  }

  return { totalCredit, totalDebit };
};

const processTaxonomySumTransactions = (taxonomy, journals, accounts) => {
  const accountCodes = [];
  const results = [];
  let currentAccount;
  let balance = 0;
  accounts.forEach((account) => {
    if (account.TaxonomyCode == taxonomy) {
      accountCodes.push(account.AccountID);
    }
  });

  accountCodes.forEach((code) => {
    currentAccount = processJournals(journals, code, false);
    balance =
      Number(currentAccount.totalDebit) - Number(currentAccount.totalCredit);
    results.push({
      taxonomy: taxonomy,
      account: code,
      balanceType: balance > 0 ? "debit" : "credit",
      balanceValue: balance > 0 ? balance : -balance,
    });
  });

  return results;
};

const processTaxonomySum = (taxonomy, accounts) => {
  // fetch the account ids for all accounts with this taxonomy code
  const results = [];
  let balance = 0;
  accounts.forEach((account) => {
    if (account.TaxonomyCode == taxonomy) {
      balance =
        Number(account.ClosingDebitBalance) -
        Number(account.ClosingCreditBalance);
      results.push({
        taxonomy: taxonomy,
        account: account.AccountID,
        balanceType: balance > 0 ? "debit" : "credit",
        balanceValue: balance > 0 ? balance : -balance,
      });
    }
  });

  return results;
};

const processSums = (assets, accounts) => {
  let total = 0,
    currentSum = 0;
  const assets_to_return = [];

  assets.forEach((assetAccount) => {
    console.log(total);

    let current_taxonomy;
    assetAccount.taxonomyCodes.forEach((taxonomy) => {
      current_taxonomy = processTaxonomySum(Math.abs(taxonomy), accounts);
      current_taxonomy.forEach((tax) => {
        if (taxonomy < 0) {
          currentSum -= tax.balanceValue;
        } else {
          currentSum += tax.balanceValue;
        }
      });
    });

    if (assetAccount.ifCreditBalance) {
      assetAccount.ifCreditBalance.forEach((credit) => {
        currentTaxonomy = processTaxonomySum(Math.abs(credit), accounts);
        currentTaxonomy.forEach((tax) => {
          if (tax.balanceType === "credit") {
            if (credit < 0) {
              currentSum -= tax.balanceValue;
            } else {
              currentSum += tax.balanceValue;
            }
          }
        });
      });
    }

    if (assetAccount.ifDebtBalance) {
      assetAccount.ifDebtBalance.forEach((debit) => {
        currentTaxonomy = processTaxonomySum(Math.abs(debit), accounts);
        currentTaxonomy.forEach((tax) => {
          if (tax.balanceType === "debit") {
            if (debit < 0) {
              currentSum -= tax.balanceValue;
            } else {
              currentSum += tax.balanceValue;
            }
          }
        });
      });
    }

    if (assetAccount.ifCreditOrDebit) {
      assetAccount.ifCreditOrDebit.forEach((creditOrDebit) => {
        currentTaxonomy = processTaxonomySum(Math.abs(creditOrDebit), accounts);
        currentTaxonomy.forEach((tax) => {
          if (tax.balanceType === "debit") {
            currentSum -= tax.balanceValue;
          } else {
            currentSum += tax.balanceValue;
          }
        });
      });
    }

    assets_to_return.push({ name: assetAccount.name, value: currentSum });
    total += currentSum;
    currentSum = 0;
  });

  return {
    assets_to_return,
    total,
  };
};

const processEntitiesProfitLoss = (entites, journals, accounts) => {
  let currentSum = 0;
  const returns = [];

  entites.forEach((entity) => {
    let current_taxonomy;
    entity.taxonomyCodes.forEach((taxonomy) => {
      current_taxonomy = processTaxonomySumTransactions(
        Math.abs(taxonomy),
        journals,
        accounts
      );
      current_taxonomy.forEach((tax) => {
        if (taxonomy < 0) {
          currentSum -= tax.balanceValue;
        } else {
          currentSum += tax.balanceValue;
        }
      });
    });

    if (entity.ifCreditOrDebit) {
      entity.ifCreditOrDebit.forEach((creditOrDebit) => {
        current_taxonomy = processTaxonomySumTransactions(
          Math.abs(creditOrDebit),
          journals,
          accounts
        );
        current_taxonomy.forEach((tax) => {
          if (tax.balanceType === "debit") {
            currentSum -= tax.balanceValue;
          } else {
            currentSum += tax.balanceValue;
          }
        });
      });
    }

    returns.push({ name: entity.name, value: currentSum });
    currentSum = 0;
  });

  return returns;
};

const getAssets = (account) => {
  let totalCurrent = 0;
  let totalNonCurrent = 0;
  let currentAssets = [];
  let nonCurrentAssets = [];
  let final_total = 0;

  const { assets_to_return, total } = processSums(
    balanceSheetTemplate.assets.current,
    account
  );
  totalCurrent = total;
  currentAssets = assets_to_return;

  const nonCurrent = processSums(
    balanceSheetTemplate.assets.nonCurrent,
    account
  );
  totalNonCurrent = nonCurrent.total;
  nonCurrentAssets = nonCurrent.assets_to_return;

  final_total = totalCurrent + totalNonCurrent;
  //console.log(nonCurrentAssets);

  return {
    totalCurrent,
    totalNonCurrent,
    currentAssets,
    nonCurrentAssets,
    final_total,
  };
};

const getLiabilities = (account) => {
  let totalCurrent = 0;
  let totalNonCurrent = 0;
  let currentLiabilites = [];
  let nonCurrentLiabilities = [];
  let final_total = 0;

  const { assets_to_return, total } = processSums(
    balanceSheetTemplate.liabilities.current,
    account
  );
  totalCurrent = total;
  currentLiabilites = assets_to_return;

  const nonCurrent = processSums(
    balanceSheetTemplate.liabilities.nonCurrent,
    account
  );
  totalNonCurrent = nonCurrent.total;
  nonCurrentLiabilities = nonCurrent.assets_to_return;

  final_total = totalCurrent + totalNonCurrent;
  // console.log(nonCurrentAssets);

  return {
    totalCurrent,
    totalNonCurrent,
    currentLiabilites,
    nonCurrentLiabilities,
    final_total,
  };
};

const getEquity = (account) => {
  let equity = [];

  const { assets_to_return, total } = processSums(
    balanceSheetTemplate.equity,
    account
  );
  equity = assets_to_return;

  // console.log(nonCurrentAssets);

  return {
    total,
    equity,
  };
};

// assets = equity + liability
const balanceSheet = (account) => {
  const assets = getAssets(account);
  const liabilities = getLiabilities(account);
  const equity = getEquity(account);
  // liabilities
  // equity
  return { assets, liabilities, equity };
};

const profitLoss = (journals, accounts) => {
  const revenue = processEntitiesProfitLoss(
    profitLossTemplate.revenue,
    journals,
    accounts
  );
  const expenses = processEntitiesProfitLoss(
    profitLossTemplate.expenses,
    journals,
    accounts
  );
  const interest = processEntitiesProfitLoss(
    profitLossTemplate.interest,
    journals,
    accounts
  );
  const depreciation = processEntitiesProfitLoss(
    profitLossTemplate.depreciation,
    journals,
    accounts
  );
  const taxes = processEntitiesProfitLoss(
    profitLossTemplate.taxes,
    journals,
    accounts
  );

  const ebitda =
    revenue.reduce((acc, curr) => acc + curr.value, 0) -
    expenses.reduce((acc, curr) => acc + curr.value, 0);
  const ebit = ebitda - depreciation.reduce((acc, curr) => acc + curr.value, 0);

  let incomeInterest = 0;
  let expensesInterest = 0;

  for (let i = 0; i < interest.length; i++) {
    if (interest[i].name === "Juros e rendimentos similares obtidos") {
      incomeInterest = interest[i].value;
    } else if (interest[i].name === "Juros e gastos similares suportados") {
      expensesInterest = interest[i].value;
    }
  }
  const netIncome =
    ebit +
    incomeInterest -
    expensesInterest -
    taxes.reduce((acc, curr) => acc + curr.value, 0);

  return {
    revenue,
    expenses,
    interest,
    depreciation,
    taxes,
    ebitda,
    ebit,
    netIncome,
  };
};

/**
 *
 * GPM = (Net Sales - Cogs)/ Net Sales
 */
const grossProfitMargin = (journal) => {
  // 71 corresponde a vendas
 const revenue = processJournals(journal, '71', false);
 // 61 corresponde a custo das mercadorias que foram vendidas
 const costOfGods = processJournals(journal, '61', false);
 const netSales = revenue.totalCredit - revenue.totalDebit;
 return (netSales - (costOfGods.totalDebit - costOfGods.totalCredit))/ netSales;
};

module.exports = (server, db) => {
  server.get("/api/financial/balance-sheet", (req, res) => {
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    const balanceSheetResponse = balanceSheet(accounts);

    res.json({ balanceSheetResponse });
  });

  server.get("/api/financial/accounts-receivable", (req, res) => {
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    const assets = getAssets(accounts);

    console.table(assets.currentAssets);

    const clients = assets.currentAssets.find(
      (element) => element.name === "Clientes"
    );

    res.json({ value: clients.value });
  });

  server.get("/api/financial/profit-loss", (req, res) => {
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    const journal = db.GeneralLedgerEntries.Journal;
    const pl = profitLoss(journal, accounts);
    res.json(pl);
  });

  server.get("/api/financial/account-balance", (req, res) => {
    const journal = db.GeneralLedgerEntries.Journal;
    const values = processJournals(
      journal,
      req.query.accountId,
      req.query.monthly === "true"
    );
    res.json(values);
  });

  server.get('/api/financial/ebitda', (req, res) => {
    const journal = db.GeneralLedgerEntries.Journal;
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    res.json({ebitda: profitLoss(journal, accounts).ebitda});
  });

  server.get('/api/financial/ebit', (req, res) => {
    const journal = db.GeneralLedgerEntries.Journal;
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    res.json({ebit: profitLoss(journal, accounts).ebit});
  });

  server.get('/api/financial/gpm', (req, res) => {
    const journal = db.GeneralLedgerEntries.Journal;

    res.json({gpm : grossProfitMargin(journal) });
  });
};
