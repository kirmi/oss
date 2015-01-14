package com.shinowit.service;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeInStockDetailsInfoEntity;
import com.shinowit.entity.TMeInStockInfoEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service
public class InstoreService {

    @Resource
    private BaseDAO<TMeInStockInfoEntity> instockdao;

    @Resource
    private BaseDAO<TMeInStockDetailsInfoEntity> instockdetaldao;

    @Transactional
    public boolean instockinfo(TMeInStockInfoEntity insok,List<TMeInStockDetailsInfoEntity> jinhuoData){
        boolean result = false;
        instockdao.insert(insok);
        try{
            for(TMeInStockDetailsInfoEntity ee:jinhuoData){
                ee.setTMeInStockInfoByBillCode(insok);
                instockdetaldao.insert(ee);
            }
                result = true;
        }catch(Exception e){
            e.printStackTrace();
        }
        return result;
    }

}
