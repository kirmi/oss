package com.shinowit.entity;

import java.util.ArrayList;
import java.util.List;

public class TreeNode {

    private TreeNode node;

    private List<TreeNode> children=new ArrayList<TreeNode>();

    private TAuMenuInfoEntity menu;

    private boolean checked;//这个是可以让前台的树有多选框的

    public void addChild(TreeNode childNode){
        childNode.node=this;
        children.add(childNode);
    }

    public boolean isLeaf(){
        return children.size()==0;
    }

    public List<TreeNode> getChildren() {
        return children;
    }

    public void setChildren(List<TreeNode> children) {
        this.children = children;
    }

    public TAuMenuInfoEntity getMenu() {
        return menu;
    }

    public void setMenu(TAuMenuInfoEntity menu) {
        this.menu = menu;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }
}
