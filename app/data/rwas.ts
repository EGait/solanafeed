// Popular tokenized stocks (xStocks by Backed) with verified Solana mint addresses.
// Addresses cross-verified against KuCoin, Gate, Solflare, and VALR listings (July 2026).
// If you ever edit these, re-verify on solscan.io before deploying. A wrong mint = users swapping into a scam token.
export const tokenizedStocks = [
  {
    ticker: 'TSLAx',
    name: 'Tesla xStock',
    underlying: 'Tesla, Inc. (TSLA)',
    mint: 'XsDoVfqeBukxuZHWhdvWHBhgEHjGNst4MLodqsJHzoB',
  },
  {
    ticker: 'NVDAx',
    name: 'NVIDIA xStock',
    underlying: 'NVIDIA Corp (NVDA)',
    mint: 'Xsc9qvGR1efVDFGLrVsmkzv3qi45LTBjeUKSPmx9qEh',
  },
  {
    ticker: 'SPYx',
    name: 'SP500 xStock',
    underlying: 'S&P 500 ETF (SPY)',
    mint: 'XsoCS1TfEyfFhfvj8EtZ528L3CaKBDBRqRapnBbDF2W',
  },
  {
    ticker: 'CRCLx',
    name: 'Circle xStock',
    underlying: 'Circle Internet Group (CRCL)',
    mint: 'XsueG8BtpquVJX9LVLLEGuViXUungE6WmK5YZ3p3bd1',
  },
  {
    ticker: 'AAPLx',
    name: 'Apple xStock',
    underlying: 'Apple Inc. (AAPL)',
    mint: 'XsbEhLAtcf6HdfpFZ5xEMdqW8nfAvcsP5bdudRLJzJp',
  },
  {
    ticker: 'GOOGLx',
    name: 'Alphabet xStock',
    underlying: 'Alphabet Inc. (GOOGL)',
    mint: 'XsCPL9dNWBMvFtTmwcCA5v3xWPSMEBCszbQdiLLq6aN',
  },
  {
    ticker: 'AMZNx',
    name: 'Amazon xStock',
    underlying: 'Amazon.com Inc. (AMZN)',
    mint: 'Xs3eBt7uRfJX8QUs4suhyU8p2M6DoUDrJyWBa8LLZsg',
  },
  {
    ticker: 'QQQx',
    name: 'Nasdaq xStock',
    underlying: 'Nasdaq-100 ETF (QQQ)',
    mint: 'Xs8S1uUs1zvS2p7iwtsG3b6fkhpvmwz4GYU3gWAmWHZ',
  },
  {
    ticker: 'MSTRx',
    name: 'MicroStrategy xStock',
    underlying: 'MicroStrategy Inc. (MSTR)',
    mint: 'XsP7xzNPvEHS1m6qfanPUGjNmdnmsLKEoNAnHjdxxyZ',
  },
]

export const rwas = [
  // ---- Tokenized Stocks & ETFs ----
  {
    name: "xStocks",
    ticker: "TSLAx, NVDAx, SPYx +57 more",
    category: "Tokenized Stocks",
    issuer: "Backed Finance (acquired by Kraken)",
    description:
      "The most DeFi-native tokenized stocks on Solana. Around 60 assets covering major US stocks and ETFs, tradeable on Raydium and Jupiter and usable as collateral on Jupiter Lend. Structured as Swiss-law tracker certificates: you get price exposure, not shareholder rights, and you carry issuer credit risk.",
    access: "Not available to US residents",
    yield: null,
    link: "https://xstocks.com",
  },
  {
    name: "Ondo Global Markets",
    ticker: "NVDAon, TSLAon, SPCXon +430 more",
    category: "Tokenized Stocks",
    issuer: "Ondo Finance",
    description:
      "The largest tokenized equities platform by breadth, now past 430 US stocks and ETFs with over $1B in TVL, including SPCXon for onchain SpaceX exposure. Structured as notes against a bankruptcy-remote SPV with 1:1-plus collateral and third-party verification, but no shareholder rights. Live on Solana since January 2026 and accessible self-custodially in supported regions.",
    access: "Non-US, supported regions only",
    yield: null,
    link: "https://ondo.finance",
  },
  {
    name: "Sunrise × Backpack",
    ticker: "SPCX +newly listed equities",
    category: "Tokenized Stocks",
    issuer: "Sunrise / Backpack Securities",
    description:
      "Sunrise is the tokenization platform behind Backpack's SPCX, which launched the same day SpaceX listed on Nasdaq and has since brought other fresh listings like Micron onchain. The strongest legal structure in the category: tokens map 1:1 to real shares at a US broker-dealer and are redeemable into the underlying for eligible holders. SPCX crossed $350M in cumulative volume within weeks and co-led Solana's record $380M tokenized-equity trading day. Caution: impostor 'Sunrise' websites are circulating; access these products through Backpack and verify any Sunrise domain independently before connecting a wallet.",
    access: "Eligibility requirements apply",
    yield: null,
    link: "https://backpack.exchange",
  },

  // ---- Tokenized Treasuries & Funds ----
  {
    name: "BlackRock BUIDL",
    ticker: "BUIDL",
    category: "Tokenized Treasuries",
    issuer: "BlackRock / Securitize",
    description:
      "The largest RWA position on Solana at roughly $615M, part of a $2.5B+ tokenized money-market fund from the world's biggest asset manager. Yield from short-term Treasuries with dividends paid onchain. Permissioned: transfers only between Securitize-approved addresses, so this is institutional plumbing rather than a retail product.",
    access: "KYC and accreditation required",
    yield: "Treasury yield, paid monthly",
    link: "https://securitize.io",
  },
  {
    name: "Ondo USDY",
    ticker: "USDY",
    category: "Tokenized Treasuries",
    issuer: "Ondo Finance",
    description:
      "A yield-bearing alternative to stablecoins backed by short-term US Treasuries, paying around 4.65% APY with about $181M on Solana. Increasingly used as base-layer DeFi collateral in place of non-yielding stablecoins. Transfer restrictions apply and it is not offered to US persons.",
    access: "Non-US only",
    yield: "~4.65% APY",
    link: "https://ondo.finance",
  },
  {
    name: "Franklin Templeton BENJI",
    ticker: "BENJI",
    category: "Tokenized Treasuries",
    issuer: "Franklin Templeton",
    description:
      "Tokenized shares of the FOBXX government money-market fund, the first US-registered mutual fund to use a public blockchain as its official record. Roughly $2.47B in total assets across nine chains including Solana. A regulated, conservative way to hold Treasury yield onchain.",
    access: "KYC via Benji app",
    yield: "Money-market yield",
    link: "https://franklintempleton.com",
  },
  {
    name: "Bitwise USCC",
    ticker: "USCC",
    category: "Tokenized Funds",
    issuer: "Bitwise",
    description:
      "A tokenized fund from crypto asset manager Bitwise that launched on Solana with about $267M in AUM, part of the 2026 wave of institutional issuers choosing Solana for settlement speed and cost.",
    access: "KYC and eligibility requirements",
    yield: "Fund strategy returns",
    link: "https://bitwiseinvestments.com",
  },

  // ---- RWA Perps ----
  {
    name: "Ondo Perps",
    ticker: "SPCX, NVDA, TSLA, QQQ, gold, oil +more",
    category: "RWA Perps",
    issuer: "Ondo Finance",
    description:
      "The first perps platform where tokenized stocks themselves work as collateral. Launched July 7 in public beta with up to 20x leverage and 24/7 trading on US equities, ETFs, indices, and commodities, it did over $100M in volume on day one and passed $2B cumulative within 48 hours. You are trading a derivative, not the tokenized stock: leverage means liquidation risk, especially when equity news hits while traditional markets are closed.",
    access: "Not available to US persons",
    yield: null,
    link: "https://ondo.finance",
  },
  {
    name: "Flash Trade Equity Perps",
    ticker: "TSLA, NVDA, AAPL, AMZN, AMD, PLTR",
    category: "RWA Perps",
    issuer: "Flash Trade",
    description:
      "Solana-native pool-to-peer perps DEX offering up to 20x leverage on major US stocks, trading 24x5, backed by xStocks liquidity and priced by Pyth oracles. Liquidity providers can deposit into the FLP.x pool to earn fees as the counterparty to traders. Founded by ex-Mango builders and expanding into commodities and forex perps.",
    access: "Geo-restrictions apply; check eligibility",
    yield: "FLP.x pool yield for LPs",
    link: "https://flash.trade",
  },
  {
    name: "Phoenix Perpetuals",
    ticker: "SPCX, TSLA, NVDA, MSFT, META +more",
    category: "RWA Perps",
    issuer: "Ellipsis Labs",
    description:
      "A fully on-chain limit orderbook perps exchange from the team behind Phoenix spot, with crankless ~0.5 second execution and costs targeting parity with centralized exchanges. Equity perps span major US stocks and fresh listings, including SPCX, TSLA, NVDA, GOOGL, MSFT, META, AMZN, AAPL, COIN, MSTR, CRCL, and HOOD, with leverage from 10x to 20x depending on the market. SPCX has been among its most traded pairs.",
    access: "Not available in the US",
    yield: null,
    link: "https://phoenix.trade",
  },
]