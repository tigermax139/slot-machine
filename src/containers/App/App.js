import React from 'react';
import _ from 'lodash';

import ReelsContainer from "../../components/ReelsContainer";
import Button from "../../components/Button";
import DebugArea from "../../components/DebugArea";
import PayTable from "../../components/PayTable";
import BalanceIndicator from "../../components/BalanceIndicator";

import ee, {eventTypes} from '../../config/emitter';
import slotConfig from "../../config/slot.config";
import gameConfig from "../../config/game.config";
import { GameError, errorCodes } from "../../config/errors";

import './App.scss';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.isLock = false;
        this.state = {
            gameId: 0,
            balance: 100, // initial balance
        };
        ee.enableLogging(); // TODO make dependent
    }

    calculateResultCombination() {
        const maxIndex = slotConfig.symbolsOrder.length - 1;
        const result = [
            [ // Top line
                slotConfig.symbolsOrder[_.random(0, maxIndex)],
                slotConfig.symbolsOrder[_.random(0, maxIndex)],
                slotConfig.symbolsOrder[_.random(0, maxIndex)],
            ],
            [ // Center line
                slotConfig.symbolsOrder[_.random(0, maxIndex)],
                slotConfig.symbolsOrder[_.random(0, maxIndex)],
                slotConfig.symbolsOrder[_.random(0, maxIndex)],
            ],
            [ // Bottom line
                slotConfig.symbolsOrder[_.random(0, maxIndex)],
                slotConfig.symbolsOrder[_.random(0, maxIndex)],
                slotConfig.symbolsOrder[_.random(0, maxIndex)],
            ],
        ];

        return result;
    }

    getLineNameByIndex(index) {
        switch (index) {
            case 0: return 'top';
            case 1: return 'center';
            case 2: return 'bottom';
            default: throw new Error('Undefined line index ' + index);
        }
    }

    calculatePay(combination) {
        let pay = 0;
        const singeSlotMatches = [];
        const groupMatches = [];

        combination.forEach((lineSlots, index) => {
            const lineKey = lineSlots.join(' ');
            const lineName = this.getLineNameByIndex(index);

            // Calculate matcher by single slots
            const singleMatch = slotConfig.payTable.single[lineKey];
            if (singleMatch !== undefined) {
                singeSlotMatches.push({
                    line: lineName,
                    value: singleMatch[lineName],
                    combinationKey: lineKey,
                    singleMatch: true,
                    groupMatch: false
                });
                pay += singleMatch[lineName];
            }

            // Calculate group matches
            const lineSlotsGroupKey = lineSlots.map(slotName => slotConfig.symbolsList[slotName].group).join(' ');

            const groupMatch = slotConfig.payTable.groups[lineSlotsGroupKey];

            if (groupMatch !== undefined) {
                groupMatches.push({
                    line: lineName,
                    value: groupMatch[lineName],
                    combinationKey: lineSlotsGroupKey,
                    singleMatch: false,
                    groupMatch: true
                });
                pay += groupMatch[lineName];
            }

        });

        return {
            singeSlotMatches,
            groupMatches,
            pay
        }
    }

    initGame() {
        if (this.isLock) {
            console.warn('Game already started');
            return false;
        }

        this.isLock = true;

        try {
            const gameId = this.state.gameId + 1;
            const balance = this.state.balance;

            if (balance < gameConfig.spinCost) {
                throw new GameError(errorCodes.lowBalance.code, 'Your balance is less than', gameConfig.spinCost)
            }

            this.setState(state => ({
                gameId,
                balance: state.balance - gameConfig.spinCost
            }));

            ee.emit(eventTypes.gameStart, {gameId});

            const combination  = this.calculateResultCombination();
            const result = this.calculatePay(combination);

            // TODO remove console.log
            console.table(combination);
            console.log(result);

            const isWin = result > 0;

            this.setState(state => ({
                balance: state.balance + result.pay
            }));

            if (isWin) {
                ee.emit(eventTypes.win, result);
            }

            ee.emit(eventTypes.gameEnd, {gameId});
        } catch (e) {
            if (e instanceof GameError) {
                this.onGameError(e);
            }
            throw e;
        } finally {
            this.isLock = false;
        }
    }

    onGameError(e) {
        console.warn(e);
    }

    onSpinClick() {
        this.initGame();
    }

    render() {
        return (
            <div className="App">

                <div className="uk-grid uk-grid-medium">
                    <div className="uk-width-1-1@s">
                        <div className="uk-flex uk-flex-center">
                            <BalanceIndicator balance={this.state.balance}/>
                        </div>
                        <div className="uk-flex uk-flex-center">
                            <ReelsContainer/>
                        </div>
                        <div className="uk-flex uk-flex-center">
                            <Button value="Spin!" round={true} onClick={this.onSpinClick.bind(this)}/>
                        </div>
                    </div>
                    <div>
                        <PayTable/>
                    </div>
                    <div>
                        <DebugArea gameId={this.state.gameId}/>
                    </div>
                </div>

            </div>
        );
    }
}

export default App;
