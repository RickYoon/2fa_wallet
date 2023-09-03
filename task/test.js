"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var config_1 = require("hardhat/config");
var utils_1 = require("ethers/utils");
var STACKUP = "https://api.stackup.sh/v1/node/65bdd496f420d5610b504691af2787cda9a580cd2be7d3fb64a78fc17bc65c42";
config_1.task("test-userop-initcode", "deploy erc20 paymaster")
    .setAction(function (taskArgs, hre) { return __awaiter(void 0, void 0, void 0, function () {
    var signer, addr, entrypoint, ecdsaFactory, account, kernel, _a, _b, _c, userOp, stackup, gas, userOpHash, userOpHashHex, userOpSig, receipt;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0: return [4 /*yield*/, hre.ethers.getSigners()];
            case 1:
                signer = (_e.sent())[0];
                return [4 /*yield*/, signer.getAddress()];
            case 2:
                addr = _e.sent();
                console.log("signer address: ", addr);
                return [4 /*yield*/, hre.ethers.getContractAt("EntryPoint", "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789")];
            case 3:
                entrypoint = _e.sent();
                return [4 /*yield*/, hre.ethers.getContractAt("ECDSAKernelFactory", "0x08e627ca6a0593c807091726a7fbb2887a1cb556")];
            case 4:
                ecdsaFactory = _e.sent();
                return [4 /*yield*/, ecdsaFactory.getAccountAddress(addr, 3)];
            case 5:
                account = _e.sent();
                return [4 /*yield*/, hre.ethers.getContractAt("Kernel", account)];
            case 6:
                kernel = _e.sent();
                _b = (_a = console).log;
                _c = ["maxFeePerGas : "];
                return [4 /*yield*/, hre.ethers.provider.getGasPrice()];
            case 7:
                _b.apply(_a, _c.concat([_e.sent()]));
                _d = {
                    sender: account,
                    nonce: 0,
                    initCode: utils_1.hexConcat([ecdsaFactory.address, ecdsaFactory.interface.encodeFunctionData("createAccount", [addr, 3])]),
                    callData: kernel.interface.encodeFunctionData("execute", [addr, 0, "0x", 0]),
                    callGasLimit: 100000,
                    verificationGasLimit: 300000,
                    preVerificationGas: 300000
                };
                return [4 /*yield*/, hre.ethers.provider.getGasPrice()];
            case 8:
                userOp = (_d.maxFeePerGas = (_e.sent()).toHexString(),
                    _d.maxPriorityFeePerGas = 1000000000,
                    _d.paymasterAndData = "0x",
                    _d.signature = "0x",
                    _d);
                return [4 /*yield*/, hre.ethers.provider.getBalance(account)];
            case 9:
                if (!(_e.sent()).lt(hre.ethers.BigNumber.from("100000000000000000"))) return [3 /*break*/, 11];
                console.log("insufficient balance");
                return [4 /*yield*/, signer.sendTransaction({
                        to: account,
                        value: hre.ethers.BigNumber.from("100000000000000000")
                    })];
            case 10:
                _e.sent();
                _e.label = 11;
            case 11:
                stackup = new hre.ethers.providers.JsonRpcProvider(STACKUP);
                userOp.signature = utils_1.hexConcat(["0x00000000", utils_1.hexZeroPad("0xb1", 65)]);
                return [4 /*yield*/, stackup.send("eth_estimateUserOperationGas", [userOp, entrypoint.address])];
            case 12:
                gas = _e.sent();
                console.log("gas: ", gas);
                userOp.callGasLimit = gas.callGasLimit;
                userOp.verificationGasLimit = gas.verificationGas;
                userOp.preVerificationGas = gas.preVerificationGas;
                return [4 /*yield*/, entrypoint.getUserOpHash(userOp)];
            case 13:
                userOpHash = _e.sent();
                userOpHashHex = utils_1.arrayify(userOpHash);
                return [4 /*yield*/, signer.signMessage(userOpHashHex)];
            case 14:
                userOpSig = _e.sent();
                console.log("userOpSig: ", userOpSig);
                userOp.signature = utils_1.hexConcat(["0x00000000", userOpSig]);
                return [4 /*yield*/, stackup.send("eth_sendUserOperation", [userOp, entrypoint.address])];
            case 15:
                receipt = _e.sent();
                return [2 /*return*/];
        }
    });
}); });
config_1.task("test-userop", "test userop")
    .setAction(function (taskArgs, hre) { return __awaiter(void 0, void 0, void 0, function () {
    var kernel_id, signer, addr, entrypoint, ecdsaFactory, account, kernel, _a, _b, _c, userOp, stackup, gas, userOpHash, userOpHashHex, userOpSig, receipt;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                kernel_id = 3;
                return [4 /*yield*/, hre.ethers.getSigners()];
            case 1:
                signer = (_e.sent())[0];
                return [4 /*yield*/, signer.getAddress()];
            case 2:
                addr = _e.sent();
                console.log("signer address: ", addr);
                return [4 /*yield*/, hre.ethers.getContractAt("EntryPoint", "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789")];
            case 3:
                entrypoint = _e.sent();
                return [4 /*yield*/, hre.ethers.getContractAt("ECDSAKernelFactory", "0x08e627ca6a0593c807091726a7fbb2887a1cb556")];
            case 4:
                ecdsaFactory = _e.sent();
                return [4 /*yield*/, ecdsaFactory.getAccountAddress(addr, kernel_id)];
            case 5:
                account = _e.sent();
                return [4 /*yield*/, hre.ethers.getContractAt("Kernel", account)];
            case 6:
                kernel = _e.sent();
                _b = (_a = console).log;
                _c = ["maxFeePerGas : "];
                return [4 /*yield*/, hre.ethers.provider.getGasPrice()];
            case 7:
                _b.apply(_a, _c.concat([_e.sent()]));
                _d = {
                    sender: account
                };
                return [4 /*yield*/, entrypoint.getNonce(account, 0)];
            case 8:
                _d.nonce = (_e.sent()).toHexString(),
                    _d.initCode = "0x",
                    _d.callData = kernel.interface.encodeFunctionData("execute", [addr, 0, "0x", 0]),
                    _d.callGasLimit = 100000,
                    _d.verificationGasLimit = 300000,
                    _d.preVerificationGas = 45100;
                return [4 /*yield*/, hre.ethers.provider.getGasPrice()];
            case 9:
                userOp = (_d.maxFeePerGas = (_e.sent()).toHexString(),
                    _d.maxPriorityFeePerGas = 1000000000,
                    _d.paymasterAndData = "0x",
                    _d.signature = "0x",
                    _d);
                return [4 /*yield*/, hre.ethers.provider.getBalance(account)];
            case 10:
                if (!(_e.sent()).lt(hre.ethers.BigNumber.from("100000000000000000"))) return [3 /*break*/, 12];
                console.log("insufficient balance");
                return [4 /*yield*/, signer.sendTransaction({
                        to: account,
                        value: hre.ethers.BigNumber.from("100000000000000000")
                    })];
            case 11:
                _e.sent();
                _e.label = 12;
            case 12:
                stackup = new hre.ethers.providers.JsonRpcProvider(STACKUP);
                userOp.signature = utils_1.hexConcat(["0x00000000", utils_1.hexZeroPad("0x8f51af942b92e95ec77b4ae8b4197ca94373be26205746c506997587d0fd5efe6f5ea33ea7fcf09c9cd38216837c4739a8283d6f97e9977aa1f102fee5d0516b1b", 65)]);
                return [4 /*yield*/, stackup.send("eth_estimateUserOperationGas", [userOp, entrypoint.address])];
            case 13:
                gas = _e.sent();
                console.log("gas: ", gas);
                userOp.callGasLimit = gas.callGasLimit;
                userOp.verificationGasLimit = gas.verificationGas;
                userOp.preVerificationGas = gas.preVerificationGas;
                return [4 /*yield*/, entrypoint.getUserOpHash(userOp)];
            case 14:
                userOpHash = _e.sent();
                userOpHashHex = utils_1.arrayify(userOpHash);
                return [4 /*yield*/, signer.signMessage(userOpHashHex)];
            case 15:
                userOpSig = _e.sent();
                console.log("userOpSig: ", userOpSig);
                userOp.signature = utils_1.hexConcat(["0x00000000", userOpSig]);
                return [4 /*yield*/, stackup.send("eth_sendUserOperation", [userOp, entrypoint.address])];
            case 16:
                receipt = _e.sent();
                return [2 /*return*/];
        }
    });
}); });
