import { tokenEight, tokenNine, tokenOne, tokenTen, tokenThree, tokenTwo } from "../scripts/blackhole-scripts/dexAbi";

export const deployedPairs = [
    {
        token0: tokenOne,
        token1: tokenTwo,
        stable: false,
        pairAddress: "0x1c2b9eb0a6c13e7d21f9915bea738e4d7a24c358"
    },
    {
        token0: tokenThree,
        token1: tokenTwo,
        stable: false,
        pairAddress: "0xc6e39a293117881cbf6156d1616bb362121bbb0a"
    },
    {
        token0: tokenOne,
        token1: tokenEight,
        stable: false,
        pairAddress: "0xc6e39a293117881cbf6156d1616bb362121bbb0a"
    },
    {
        token0: tokenOne,
        token1: tokenTen,
        stable: false,
        pairAddress: "0x285e4B9137c2e0D482A044Db0B1c1E8616fa8c3e"
    },
    {
        token0: tokenTwo,
        token1: tokenNine,
        stable: true,
        pairAddress: "0x91De570eCb5266aDf0767ce7c0488d43D3f46E97"
    },
    {
        token0: tokenEight,
        token1: tokenNine,
        stable: true,
        pairAddress: "0x88C42515D5B51b25927b77EF1E74d14E7f0A5257"
    },
]