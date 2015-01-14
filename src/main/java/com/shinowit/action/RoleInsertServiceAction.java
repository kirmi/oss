package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TAuAuthorizationEntity;
import com.shinowit.entity.TAuMenuInfoEntity;
import com.shinowit.entity.TAuRoleInfoEntity;
import com.shinowit.service.RoleInsertService;

import javax.annotation.Resource;
import java.util.List;


public class RoleInsertServiceAction extends ActionSupport {

    @Resource
    private RoleInsertService roleInsertService;

    private TAuRoleInfoEntity rlosinfo;

    private List<TAuMenuInfoEntity> dds;

    private boolean success;

    private boolean query;

    private String message;


    public String qunxiantianjia(){

        roleInsertService.roleinser(rlosinfo,dds);

        if(roleInsertService.roleinser(rlosinfo,dds)==true){
            setSuccess(true);
            setQuery(true);
            setMessage("信息插入成功");
        }else{
            setSuccess(false);
            setQuery(true);
            setMessage("信息输入有误请重新输入");
        }

        return "okli";
    }

    public TAuRoleInfoEntity getRlosinfo() {
        return rlosinfo;
    }

    public void setRlosinfo(TAuRoleInfoEntity rlosinfo) {
        this.rlosinfo = rlosinfo;
    }

    public List<TAuMenuInfoEntity> getDds() {
        return dds;
    }

    public void setDds(List<TAuMenuInfoEntity> dds) {
        this.dds = dds;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isQuery() {
        return query;
    }

    public void setQuery(boolean query) {
        this.query = query;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
