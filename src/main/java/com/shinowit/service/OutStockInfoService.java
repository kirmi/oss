package com.shinowit.service;

import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeOutStockDetailsInfoEntity;
import com.shinowit.entity.TMeOutStockInfoEntity;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class OutStockInfoService {

    @Resource
    private BaseDAO<TMeOutStockInfoEntity> outstockdao;

    @Resource
    private BaseDAO<TMeOutStockDetailsInfoEntity> outstockdetaldao;

    public boolean insertoutstock(TMeOutStockInfoEntity billcode,List<TMeOutStockDetailsInfoEntity> listbillcode){

        boolean result=false;

        outstockdao.insert(billcode);
        try{
            for(TMeOutStockDetailsInfoEntity ins:listbillcode){
                ins.setTMeOutStockInfoByOutBillCode(billcode);
                outstockdetaldao.insert(ins);
            }
            result = true;
        }catch(Exception e){
            e.printStackTrace();
        }
        return result;
    }


}
