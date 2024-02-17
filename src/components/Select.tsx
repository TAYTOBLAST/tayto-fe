import React from 'react';
import pageStyle from './Select.module.css'

import arrowDown from '@/assets/images/arrowDown.svg';


function Select({person}:any) {
    const typeName = person.typeName;

    const dataList = person.dataList;
    const setDataList = person.setDataList;
    const isIcon = person.isIcon ? person.isIcon : false;


    return (
        <div className={pageStyle.selectBox}>
            { dataList.isOpen ?
            <div className={pageStyle.selectMask}
                onClick={()=>{dataList.isOpen = false; setDataList();}}
            ></div>
            :<></>}
            <div className={`${pageStyle.selectBut}`}
                onClick={()=>{dataList.isOpen = !dataList.isOpen; setDataList();}}
            >
                <div className={pageStyle.selectTypeNameBox}>
                    {
                    isIcon ?
                        dataList.curVal.icon ?
                        <div className={pageStyle.selectIcon} >
                            <img className={pageStyle.selectIcon} src={dataList.curVal.icon } alt="icon" width={30} height={30}/>
                        </div>
                        : <div className={pageStyle.selectIconPlaceholder}></div>
                    :<></>
                    }

                    <div className={pageStyle.selectButText}>{dataList.curVal.label ? dataList.curVal.label : typeName}</div>
                </div>
                <div className={pageStyle.selectArrowIcon}>
                    <img src={arrowDown} alt="icon" width={20} height={20}/>
                </div>

            </div>
            { dataList.isOpen ?
            <div className={pageStyle.selectOptionBox}>
                {
                    dataList.list.map((item:any, idx:any)=>
                        <div key={idx}
                            className={pageStyle.selectOptionItem}
                            onClick={()=>{dataList.curVal = dataList.list[idx];dataList.isOpen = false; setDataList();}}
                        >
                            {
                            isIcon ?
                                item.icon ?
                                <div className={pageStyle.selectIcon} >
                                    <img src={item.icon} alt="icon" width={30} height={30}/>
                                </div>
                                : <div className={pageStyle.selectIconPlaceholder}></div>
                            :<></>
                            }
                            <div className={pageStyle.selectOptionLabel}>{item.label}</div>
                        </div>
                    )
                }
            </div>:<></>
            }

        </div>
    )
}
export default Select;

