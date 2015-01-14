package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.TreeDAO;
import com.shinowit.entity.TreeNode;
import org.apache.struts2.ServletActionContext;

import javax.annotation.Resource;

public class IndexMenuListAction extends ActionSupport {
    @Resource
    private TreeDAO treedao;

    private TreeNode node;

    private boolean success;

    public String indexshow(){

        String currentrol=(String)ServletActionContext.getRequest().getSession().getAttribute("roleId");
        int currntid=Integer.valueOf(currentrol).intValue();
        System.out.print(currentrol);
        if (null==currentrol){
            System.out.println("session超时");
        }
        node=treedao.queryPower(currntid);

        if(node!=null){
            setSuccess(true);
        }
        return "indeslist";
    }

    public TreeNode getNode() {
        return node;
    }

    public void setNode(TreeNode node) {
        this.node = node;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
