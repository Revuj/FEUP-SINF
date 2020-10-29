/*
procurement => 
    compras (grafico) [] => grafico a ser usado tem a informacao errada, depois e preciso fazer outro
    suppliers (tabela) [x]
    product not arrived (card) [x]
    accounts payable (card) [x]
    total  em compras (card) [x]ou grafico cumulativo das compras [x]
*/

import GenericCard from "./GenericCard";
import {formatMoney} from '../helper/CurrencyFormater';
import GenericTable from "./GenericTable";
import RevenueVsCost from "./Financial/RevenueVsCost";
import '../styles/ProcurementLayout.css';

export const Procurement = ( {title}) => {

    return (
        <div>
            <h1 className = "title">{title}</h1>
            
            <section className = "card-section">
            <GenericCard className = "account-payable"
                title = "Accounts payable" 
                description = "Amounts due to vendors or suppliers for goods that have not yet been paid for."
                amount = "56000"
                formatter = {formatMoney}
                unit = "€"
                styleCard = {{
                backgroundColor:'white',
                width:'30%',
                }}
                styleTitle = { {
                borderBottom:'1px solid black'
            }}
            />
            <GenericCard className = "orders-to-arrive"
                title = "Orders that are yet to arrive" 
                description = "Amounts of money in orders that are to arrive."
                amount = "33000"
                formatter = {formatMoney}
                unit = "€"
                styleCard = {{
                backgroundColor:'white',
                width:'30%',
                }}
                styleTitle = { {
                borderBottom:'1px solid black'
            }}
            />

            <GenericCard class qName = "total-purchases"
                title = "Total purchases" 
                description = "Amounts of money spent in purchases"
                amount = "80000"
                formatter = {formatMoney}
                unit = "€"
                styleCard = {{
                backgroundColor:'white',
                width:'30%',
                }}
                styleTitle = { {
                borderBottom:'1px solid black'
            }}
            />
            </section>

            <RevenueVsCost />
           
            <GenericTable
                title = "Suppliers"
                numberItemsPerPage = {4}
                headers = {[
                    { name: "No#", field: "id", sortable: false },
                    { name: "Name", field: "name", sortable: true },
                    { name: "Email", field: "email", sortable: true },
                    { name: "Comment", field: "body", sortable: false }
                    ]}
                containerStyle = {{width: '100%', marginTop: "2rem"}}
                themeColor = "orange"
            />

        </div> 
    );
};  