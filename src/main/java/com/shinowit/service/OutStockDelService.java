package com.shinowit.service;

import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeOutStockDetailsInfoEntity;
import com.shinowit.entity.TMeOutStockInfoEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Service
public class OutStockDelService {

    @Resource
    private BaseDAO<TMeOutStockDetailsInfoEntity> detaldao;

    @Resource
    private BaseDAO<TMeOutStockInfoEntity> dao;

    @Transactional
    public boolean uotstockdel(String outbillcode){
        boolean result=false;
       try{
           int uotdel=detaldao.executeHQL("delete from TMeOutStockDetailsInfoEntity where outBillCode=? ",outbillcode);
           if(uotdel>0){
               int outdel=dao.executeHQL("delete from TMeOutStockInfoEntity where outBillCode=?",outbillcode);
               if(outdel>0){
                   result=true;
               }else{
                   result=false;
               }
           }
       }catch (Exception e){
           e.printStackTrace();
       }
        return result;
    }
}
