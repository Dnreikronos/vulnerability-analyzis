const wavax = "0xb3B3CbEd8243682845C2ff23Ea1FD48e6144E34F";
const algebraPoolDeployer = "0x42E8058A0cd1122d1DA35CB2dbc44adA2D502afD";
const algebraFactory = "0x921Efa105BFd88B4E46A78c21b834B77DF2FCc4A";
const algebraVaultFactoryStub = "0xc36fB853FAE685fC508274EBAE2Cb8efCf68BC33";
const pluginFactory = "0x37DEE61D589209c61441EAD4eAFdC1c7a3F6e32d";
const entryPoint = "0x20A289B5D33F9c178d9EDCD4989251f5e0e44bC9";
const tickLens = "0x2c6FAce3b5e8EC97dB31f295FDE97EE5e342CfB0";
const quoter = "0x522Dc0B78acA61D2A5B7b69714C8a90aA5708BD5";
const quoterV2 = "0x251d0c1F507bCf0F9dFB986DE8bd109281a2311e";
const swapRouter = "0xDeB0b774878B3807B0617695d427aC788D189350";
const nonfungibleTokenPositionDescriptor = "0xa5C94aB53cd9964c81542693F3C0De8FCF07815C";
const proxy = "0x73dE5bB958d13d6493CA1adF5266821877D9c63d";
const nonfungiblePositionManager = "0x1f9281884323E59D0E0db43d8b9F899F594a1B88";
const algebraInterfaceMulticall = "0xc33a5Ef00F271E033daEE071f31BE9dF57506f75";
const algebraEternalFarming = "0x284B2D179945e94Cf05075623BcBE808C7F552cD";
const farmingCenter = "0x4C04a1856690538D6b08c877A642A18aEA2ae199";
const algebraFarmingProxyPluginFactory = "0x89E34B87460a348731836A381d771D475c363C6B";

const algebraContracts = {
  poolDeployer: "0x7D23F298679aC3ee6AB245eAfd9dd3f65962295a",
  factory: "0xf9E1eedeE5a861C76602B310D4f4452e667B63BC",
  vaultFactory: "0xbBf1c62218Ed8cf994Cf85431e316fe96B444a78",
  BasePluginV1Factory: "0x9D2b5a75dD8fA1e89122feb77af6E178B9769Ab9",
  wrapped: "0xb3B3CbEd8243682845C2ff23Ea1FD48e6144E34F",
  entryPoint: "0xf93d5C6Ce77497A54d60d6650e2147d29A24A196",
  tickLens: "0xA06ea7617A7C9E393EF4e7868142600d5d484307",
  quoter: "0xdD44617f90D5E5373C26523Dd3f06AFC812e3B0e",
  quoterV2: "0x69be7f72f94936e81181FBD55a33ad243c083EBb",
  swapRouter: "0x274F2b1d855Eb54E58AC2D0dA66Ce0AA4bC484C8",
  nftDescriptor: "0xAF67aeAae0f3debEcb67de1969b5719017F01Dd6",
  proxy: "0x5150517b7ceb1b25D4208EAcc5F0412bC995B5aA",
  admin: "0x8ec18CcA7E8d40861dc07C217a6426f60005A661",
  nonfungiblePositionManager: "0x0807266C3DA909E5D5B1998042dD2320834E6d66",
  mcall: "0x618DF98BC027bfCf2dFd8FeCccF960A8B3b2158B",
  eternal: "0x44f928702D6afB86d0cdAea2A9D9946502e88826",
  fc: "0x01739C4a8737b55467a7A54f8b373C7744531208",
  AlgebraBasePluginV1: "0xf0CE7495c9f3C50CD79Bc6ad3151542bcA9D2Df5",
  AlgebraFarmingProxyPluginFactory: "0xbc99A213Cc3833C89d23bD2d99D2dB938252A9e8",
};

module.exports = {
  wavax,
  algebraPoolDeployer: algebraContracts.poolDeployer,
  algebraFactory: algebraContracts.factory,
  algebraVaultFactoryStub: algebraContracts.algebraVaultFactoryStub,
  pluginFactory: algebraContracts.BasePluginV1Factory,
  entryPoint: algebraContracts.entryPoint,
  tickLens: algebraContracts.tickLens,
  quoter: algebraContracts.quoter,
  quoterV2: algebraContracts.quoterV2,
  swapRouter: algebraContracts.swapRouter,
  nonfungibleTokenPositionDescriptor: algebraContracts.nonfungibleTokenPositionDescriptor,
  proxy: algebraContracts.proxy,
  nonfungiblePositionManager: algebraContracts.nonfungiblePositionManager,
  algebraInterfaceMulticall: algebraContracts.algebraInterfaceMulticall,
  algebraEternalFarming: algebraContracts.eternal,
  farmingCenter: algebraContracts.fc,
  algebraFarmingProxyPluginFactory: algebraContracts.AlgebraFarmingProxyPluginFactory,
};
