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

const processTaxonomySum = (taxonomy, accounts) => {
    // fetch the account ids for all accounts with this taxonomy code
    const results = [];
    let balance = 0;
    accounts.forEach(account => {
      if (account.TaxonomyCode == taxonomy) {
        balance =
          Number(account.ClosingDebitBalance) -
          Number(account.ClosingCreditBalance);
        results.push({
          taxonomy: taxonomy,
          account: account.AccountID,
          balanceType: balance > 0 ? 'debit' : 'credt',
          balanceValue: balance > 0 ? balance : -balance,
        });
      }
    });
  
    return results;
};

const processSums = (assets, accounts) => {
  let total = 0, currentSum = 0;
  const assets_to_return = [];

  assets.forEach(assetAccount => {

    console.log(total);

    let current_taxonomy;  
    assetAccount.taxonomyCodes.forEach(taxonomy => {
        current_taxonomy = processTaxonomySum(Math.abs(taxonomy), accounts);
        current_taxonomy.forEach(tax => {
          if (taxonomy < 0) {
            currentSum -= tax.balanceValue;
          } else {
            currentSum += tax.balanceValue;
          }
        });
    })


    if (assetAccount.ifCreditBalance) {
        assetAccount.ifCreditBalance.forEach(credit => {
            currentTaxonomy = processTaxonomySum(Math.abs(credit), accounts);
            currentTaxonomy.forEach(tax => {
              if (tax.balanceType === 'credit') {
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
        assetAccount.ifDebtBalance.forEach(debit => {
            currentTaxonomy = processTaxonomySum(Math.abs(debit), accounts);
            currentTaxonomy.forEach(tax => {
              if (tax.balanceType === 'debit') {
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
        assetAccount.ifCreditOrDebit.forEach(creditOrDebit => {
            currentTaxonomy = processTaxonomySum(Math.abs(creditOrDebit), accounts);
            currentTaxonomy.forEach(tax => {
              if (tax.balanceType === 'debit') {
                currentSum -= tax.balanceValue;
              } else {
                currentSum += tax.balanceValue;
              }
            });
        });
    }

    assets_to_return.push({name: assetAccount.name, value: currentSum});
    total += currentSum;
    currentSum = 0;

    });

    return {
        assets_to_return,
        total
    };
}



const getAssets = (account) => {

    let totalCurrent = 0;
    let totalNonCurrent = 0;
    let currentAssets = [];
    let nonCurrentAssets = [];
    let final_total = 0;

    const {assets_to_return, total} = processSums(balanceSheetTemplate.assets.current, account);
    totalCurrent = total; currentAssets = assets_to_return;

    const nonCurrent = processSums(balanceSheetTemplate.assets.nonCurrent, account);
    totalNonCurrent = nonCurrent.total; nonCurrentAssets = nonCurrent.assets_to_return;

    final_total = totalCurrent + totalNonCurrent;
    console.log(nonCurrentAssets);

    return {
        totalCurrent,
        totalNonCurrent,
        currentAssets,
        nonCurrentAssets,
        final_total
    };
}   


const balanceSheet = account => {
    const assets = getAssets(account);
    // liabilities
    // equity
    return assets;

}

module.exports = (server, db) => {

    server.get('/api/financial/balance-sheet', (req, res) => {
        const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
        const balanceSheetResponse = balanceSheet(accounts);
        res.json({balanceSheetResponse});
      });
};