import React from 'react';
import slotConfig from "../../config/slot.config";

import './PayTable.scss';

const PayTable = () => (
    <React.Fragment>
        <h2>Pay table</h2>
        <table className="uk-table uk-table-divider pay-table">
            <thead>
            <tr>
                <th>
                    Combination
                </th>
                <th>
                    Pay
                </th>
            </tr>
            </thead>
            <tbody>
            {Object.entries(slotConfig.payTable.single).map( ([combinationKey, combinationData]) => (
                <tr>
                    <td className="uk-table-middle pay-table-combination">
                        {combinationKey.split(' ').map(slotName => <img className="combination-image" src={slotConfig.symbolsList[slotName].img} alt={slotName} />)}
                    </td>
                    <td className="uk-table-middle">
                        <ul className="uk-list uk-list-bullet">
                            <li>Top: { combinationData.top }</li>
                            <li>Center: { combinationData.center }</li>
                            <li>Bottom: { combinationData.bottom }</li>
                        </ul>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </React.Fragment>
);

export default PayTable;
