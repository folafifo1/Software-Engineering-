import java.util.ArrayList;
import java.util.List;


public class LCA {

    public Node head;

    
    public class Node{
        int value;
        char key;
        List<Node> parents = new ArrayList<Node>();
        List<Node> children = new ArrayList<Node>();
    }

    
    public void createHead(int value, char key){
        Node head = new Node();
        head.value = value;
        head.key = key;
        head.parents = new ArrayList<Node>();
        head.children = new ArrayList<Node>();
        this.head = head;
    }

    public int returnvalue(Node node){
        return node.value;
    }

    public char returnKey(Node newNode){
        return newNode.key;
    }

    
    public void addNode(char key, int value,Node parent){
        Node newNode = new Node();
        newNode.key = key;
        newNode.children = new ArrayList<Node>();
        newNode.value = value;
        newNode.parents.add(parent);
        parent.children.add(newNode);
    }
    public void createHead(int value, char key){
        Node head = new Node();
        head.value = value;
        head.key = key;
        head.parents = new ArrayList<Node>();
        head.children = new ArrayList<Node>();
        this.head = head;
    }
    
    public Node findNode(char key){
        Node ret;
        if (key == head.key){
            return head;
        }
        else{
            for(int i = 0; i < head.children.size();i++){
                ret = findNode(key,head.children.get(i));
                if (ret != null){
                    return ret;
                }
            }
        }
        return null;
    }

    private Node findNode(char key, Node node){
        Node ret;
        if(node.key == key){
            return node;
        }
        else{
            for(int i = 0; i < node.children.size();i++){
                ret = findNode(key,node.children.get(i));
                if (ret != null){
                    return ret;
                }
            }
        }
        return null;
    }

   
    public Node LCA(Node start, Node p, Node q){
        Node ret = null;
        if (p.key == head.key || q.key == head.key){
            return head;
        }
        else{
            Node tempp = findNode(p.key, start);
            Node tempq = findNode(q.key, start);
            if (tempp != null && tempq != null){
                ret = start;
                for(int i = 0; i < start.children.size();i++){
                    if (LCA(start.children.get(i),p,q) != null){
                        ret = LCA(start.children.get(i),p,q);
                    }
                }
            }
        }
        return ret;
    }
}