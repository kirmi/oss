package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuOperInfoEntity;
import org.apache.struts2.ServletActionContext;

import javax.annotation.Resource;
import java.util.List;

public class LoginAction extends ActionSupport {
    @Resource
    private BaseDAO<TAuOperInfoEntity> dao;

    private List<TAuOperInfoEntity> listoper;

    private TAuOperInfoEntity operinfo;

    private boolean success;

    private boolean operquery;

    private String message;

    public String opercheck(){
        listoper=dao.listAll(TAuOperInfoEntity.class);
        for(TAuOperInfoEntity checkmess:listoper) {
            if ((operinfo.getOperName()!=null)&&(operinfo.getOperName().equals(checkmess.getOperName()))&&(operinfo.getPwd().equals(checkmess.getPwd()))){
                setSuccess(true);
                setOperquery(true);
                setMessage("登陆成功");

                String indexroleid=checkmess.getTAuRoleInfoByRoleId().getRoleId();
                ServletActionContext.getRequest().getSession().setAttribute("src",checkmess);
                ServletActionContext.getRequest().getSession().setAttribute("roleId",indexroleid);

            }if((operinfo.getOperName()==null)&&(!operinfo.getOperName().equals(checkmess.getOperName()))){
                setSuccess(true);
                setOperquery(false);
                setMessage("登录失败");

            }
        }
        return"checkinfomation";
    }

    public List<TAuOperInfoEntity> getListoper() {
        return listoper;
    }

    public void setListoper(List<TAuOperInfoEntity> listoper) {
        this.listoper = listoper;
    }

    public TAuOperInfoEntity getOperinfo() {
        return operinfo;
    }

    public void setOperinfo(TAuOperInfoEntity operinfo) {
        this.operinfo = operinfo;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isOperquery() {
        return operquery;
    }

    public void setOperquery(boolean operquery) {
        this.operquery = operquery;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
