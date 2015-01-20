package com.shinowit.dao;

import com.shinowit.entity.TAuMenuInfoEntity;
import com.shinowit.entity.TreeNode;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service
public class TreeDAO {

    @Resource
    private SessionFactory sessionFactory;

    private void querySubModule(TreeNode parentNode){
        Session session=sessionFactory.openSession();
        String hql="from TAuMenuInfoEntity  where parentid =?";
        Query querylist=session.createQuery(hql);
        querylist.setParameter(0,parentNode.getMenu().getMenuId());
        List<TAuMenuInfoEntity> showList=querylist.list();
        session.close();
        for (TAuMenuInfoEntity tli:showList){
            TreeNode treelist=new TreeNode();
            treelist.setMenu(tli);
            parentNode.addChild(treelist);
            querySubModule(treelist);
        }
    }

    @Transactional
    public TreeNode queryPower(int roleId){
        TreeNode result=new TreeNode();
        Session session=sessionFactory.openSession();
        String sql="select * from dbo.TAu_RoleInfo a inner join dbo.TAu_Authorization b on a.RoleID= b.RoleID " +
                "inner join dbo.TAu_MenuInfo c on b.MenuID =c.MenuID where a.RoleID=? and c.parentid is null";
            Query query=session.createSQLQuery(sql).addEntity(TAuMenuInfoEntity.class);

           query.setParameter(0,roleId);

            List<TAuMenuInfoEntity> menulist=query.list();

            session.close();

            for(TAuMenuInfoEntity t:menulist){


                //System.out.print(t.getMenuName());

            TreeNode treecode=new TreeNode();
                treecode.setMenu(t);

            result.addChild(treecode);

            querySubModule(treecode);
        }
       return result;
    }

}
