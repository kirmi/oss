package com.shinowit.dao;

import com.shinowit.entity.TAuMenuInfoEntity;
import com.shinowit.entity.TAuRoleInfoEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.sql.Types;
import java.util.List;

/**
 * Created by Administrator on 2014/12/11.
 */
@Repository
public class UPdateROleDao {

    @Resource
    private JdbcTemplate jt;

    public boolean updaterole(TAuRoleInfoEntity rolid,List<TAuMenuInfoEntity> lis){
        boolean result=false;
        String sql1="update TAu_RoleInfo set roleName=?,state=?,sortId=? where roleId=?";
        String sql2="delete TAu_Authorization where roleId=?";
        String Sql3="insert into TAu_Authorization (RoleID,MenuID) values(?,?)";
        int i=jt.update(sql1,new Object[]{rolid.getRoleName(),rolid.getState(),rolid.getSortId(),rolid.getRoleId()},new int[]{Types.VARCHAR,Types.BOOLEAN,Types.VARCHAR,Types.INTEGER});
        if(i>0){
            int s=jt.update(sql2, new Object[]{rolid.getRoleId()},new int[]{Types.INTEGER});
            if (s>0){
               for(TAuMenuInfoEntity ssid : lis){

                   int n=jt.update(Sql3,new Object[]{rolid.getRoleId(),ssid.getMenuId()}, new int []{Types.INTEGER,Types.INTEGER});
                   if(n>0){
                        result=true;
                   }
               }
            }
        }
        return result;
    }
}
