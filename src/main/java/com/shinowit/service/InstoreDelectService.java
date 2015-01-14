package com.shinowit.service;

import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeInStockDetailsInfoEntity;
import com.shinowit.entity.TMeInStockInfoEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Service
public class InstoreDelectService {

    @Resource
    private BaseDAO<TMeInStockInfoEntity> instockdao;

    @Resource
    private BaseDAO<TMeInStockDetailsInfoEntity> instockdetaldao;

    @Transactional
    public boolean instoredelect(String billcode){
        boolean result=false;
        try {
           int dellist= instockdao.executeHQL("delete from TMeInStockDetailsInfoEntity where billCode=?",billcode);
            if(dellist>0){
              int del= instockdetaldao.executeHQL("delete from TMeInStockInfoEntity where billCode=?",billcode);
                if(del>0){
                    result = true;
                }else{
                    result = false;
                }
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return result;
    }
}
