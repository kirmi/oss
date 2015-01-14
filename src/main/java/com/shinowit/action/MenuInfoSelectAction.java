package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuMenuInfoEntity;

import javax.annotation.Resource;
import java.util.List;


public class MenuInfoSelectAction extends ActionSupport {

    @Resource
    private BaseDAO<TAuMenuInfoEntity> dao;

    private List<TAuMenuInfoEntity> melist;

    public String mianmenu(){

        melist=dao.listAll(TAuMenuInfoEntity.class);
        return "mainlist";
    }

    public List<TAuMenuInfoEntity> getMelist() {
        return melist;
    }

    public void setMelist(List<TAuMenuInfoEntity> melist) {
        this.melist = melist;
    }
}
