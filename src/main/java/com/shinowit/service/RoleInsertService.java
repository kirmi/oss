package com.shinowit.service;


import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuAuthorizationEntity;
import com.shinowit.entity.TAuMenuInfoEntity;
import com.shinowit.entity.TAuRoleInfoEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service
public class RoleInsertService {

    @Resource
    private BaseDAO<TAuRoleInfoEntity> roldao;

    @Resource
    private BaseDAO<TAuAuthorizationEntity> autodao;

    @Transactional
    public boolean roleinser(TAuRoleInfoEntity rldls,List<TAuMenuInfoEntity> aut){
        boolean result=false;
        roldao.insert(rldls);
        if(roldao.insert(rldls)!=null){
        for(TAuMenuInfoEntity au:aut){
            TAuAuthorizationEntity dd=new TAuAuthorizationEntity();
            dd.setTAuMenuInfoByMenuId(au);
            dd.setTAuRoleInfoByRoleId(rldls);
            autodao.insert(dd);
            result=true;
        }
        }
        return result;
    }
}
