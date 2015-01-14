package com.shinowit.service;

import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeInStockDetailsInfoEntity;
import com.shinowit.entity.TMeInStockInfoEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Service
public class InStoreUpdateService {

    @Resource
    private BaseDAO<TMeInStockInfoEntity> instockdao;

    @Resource
    private BaseDAO<TMeInStockDetailsInfoEntity> instockdetaldao;

    @Transactional
    public boolean instoreupdate(TMeInStockInfoEntity ins,TMeInStockDetailsInfoEntity indel){
        boolean result=false;
        try {
                boolean nn=instockdao.update(ins);
                boolean dd=instockdetaldao.update(indel);
                if((dd==true)||(nn==true)){
                    result=true;
                }else{
                    result=false;
                }
            }
         catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

}
