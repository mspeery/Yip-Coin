# YipCoin (ERC-20) — Hardhat + TypeScript Starter

A clean, audit-friendly ERC-20 named **YipCoin (APPA)**.  
Includes Solidity contract, Hardhat + TypeScript, tests, deploy script, gas reporter, coverage, lint/format, and MIT license.

> For learning/portfolio use. If you publish a token, disclose risks and consider audits.

---

## Quickstart

```bash
# 1) Install deps
npm i

# 2) Copy env and set values
cp .env.example .env

# 3) Compile & test
npm run compile
npm test

# 4) Deploy (local / Sepolia)
npm run deploy:anvil
npm run deploy:sepolia
```

**.env** variables:

```
PRIVATE_KEY=0xabc123...        # NEVER commit real keys
SEPOLIA_RPC_URL=...            # Alchemy/Infura/etc
ETHERSCAN_API_KEY=...          # For Etherscan verification

# Optional defaults for YipCoin
INITIAL_SUPPLY=1000000000      # whole tokens (scaled by DECIMALS)
DECIMALS=18
# OWNER=0xYourEOAAddress       # defaults to deployer if omitted
```

---

## What’s inside?

```
yipcoin/
├─ contracts/
│  └─ YipCoin.sol            # OZ-based ERC-20 (YipCoin/YIP), configurable decimals
├─ scripts/
│  └─ deploy.ts              # Deploys with env-provided params
├─ test/
│  └─ YipCoin.test.ts        # Supply/decimals/owner-mint tests
├─ hardhat.config.ts         # Solidity 0.8.24, toolbox, gas reporter
├─ package.json              # compile/test/deploy/verify scripts
├─ .env.example              # template for secrets & params
├─ .eslintrc.json, .prettierrc
├─ LICENSE
└─ README.md
```

### Contract behavior
- Constructor mints entire **initial supply** to `owner` (or deployer if `OWNER` unset).
- `decimals()` is configurable (0–18; default 18).
- Owner can call `mint()` (you can `renounceOwnership()` to fix supply).

---

## Verify on Etherscan

After deploying to Sepolia, verify with:

```bash
npx hardhat verify --network sepolia <DEPLOYED_ADDRESS> 1000000000 18 0xYourEOA
```

Use the exact constructor args you deployed with.

---

## Best Practices
- Be transparent about supply, ownership, and any admin powers.
- Verify source and tag a release.
- Never promise returns; meme coins are speculative.
- If you extend features (tax/burn/anti-whale), document and test thoroughly.

---

## License
MIT — see [LICENSE](./LICENSE).
