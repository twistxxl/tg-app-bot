import React , {useCallback, useEffect, useState} from 'react';
import "./Form.css";
import { useTelegram } from '../../hooks/useTelegram';


const Form  = () => {

    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('physical');
    const {tg} = useTelegram()
    const onSendData = useCallback(() => {
        const data = {
            country,
            street,
            subject
        }
        tg.sendData(JSON.stringify(data))
    }, [])
    useEffect(() => {
            tg.WebApp.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.WebApp.offEvent('mainButtonClicked', onSendData)  
        }
    }, [])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    useEffect(() => {
        if(!country || !street) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }, [country, street])




    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    }
    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }
    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    return (
    <div className={'form'}> 
        <h3>Введите ваши данные</h3>
        <input 
        className={'input'} 
        type="text" 
        placeholder={'Cтpaнa'}
        onChange={onChangeCountry}
        value={country}
        />
        <input 
        className={'input'} 
        type="text" 
        placeholder={'Улица'} 
        onChange={onChangeStreet}
        value={street}
        />
        
        <select className={'select'} value={subject} onChange={onChangeSubject}>
            <option value={'physical'}>Физ.Лицо</option>
            <option value={'legal'}>Юр.Лицо</option>
        </select>
    </div>
);
}


export default Form