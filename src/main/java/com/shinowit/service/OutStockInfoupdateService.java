package com.shinowit.service;

import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeOutStockDetailsInfoEntity;
import com.shinowit.entity.TMeOutStockInfoEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Service
public class OutStockInfoupdateService {

    @Resource
    private BaseDAO<TMeOutStockInfoEntity> stodao;

    @Resource
    private BaseDAO<TMeOutStockDetailsInfoEntity> stodeldao;

    @Transactional
    public boolean outstock(TMeOutStockInfoEntity otsl,TMeOutStockDetailsInfoEntity sdls){
        boolean result=false;
        try{

            boolean ds=stodao.update(otsl);
            boolean ns=stodeldao.update(sdls);
            if((ds==true)||(ns==true)){
                result=true;
            }else{
                result=false;
            }

        }catch (Exception e){
            e.printStackTrace();
        }
        return result;
    }
}
