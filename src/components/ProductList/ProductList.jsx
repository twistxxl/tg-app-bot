import React, {useCallback, useEffect, useState} from 'react';
import "./ProductList.css";
import ProductItem from '../ProductItem/ProductItem';
import {useTelegram} from '../../hooks/useTelegram';


const products = [
    {id: '1', title: 'Солями', price: 500, description: '30cm'},
    {id: '2', title: 'Грибная', price: 500, description: '30cm'},
    {id: '3', title: 'Ананасовая', price: 500, description: '30cm'},
    {id: '4', title: 'СолямиLite', price: 300, description: '20cm'},
    {id: '5', title: 'Мясная', price: 560, description: '30cm'},
    {id: '6', title: 'Охотнячая', price: 600, description: '30cm'},
    {id: '7', title: 'Свиняча', price: 1500, description: '40cm'},
    {id: '8', title: 'Маргарита', price: 250, description: '20cm'},
    {id: '9', title: '4Сыра', price: 400, description: '30cm'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    } , 0)
}


const ProductList  = () => {

    const {tg, queryId} = useTelegram()
    const [addedItems, setAddedItems] = React.useState([]);

    const onSendData = useCallback(() => {
        const data = {
            items: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://localhost:8000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
    })
    }, [])
    useEffect(() => {
            tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)  
        }
    }, [onSendData])


    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];
        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }
        setAddedItems(newItems);

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить (${getTotalPrice(newItems)})`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                product={item}
                onAdd={onAdd}
                className={'item'}
                />
            ))}
            
        </div>
    );
}


export default ProductList