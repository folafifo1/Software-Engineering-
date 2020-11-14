import static org.junit.Assert.*;

import static org.junit.Assert.*;

import org.junit.Test;

public class LCAD_test {



    @Test
    public void testAdd(){
        LCADAG tree = new LCADAG();
        tree.createHead(1,'a');
        tree.addNode('b',2,tree.head);
        assertEquals("Get first node added",'b',tree.returnKey(tree.head.children.get(0)));
        tree.addNode('c', 3, tree.head.children.get(0));
        assertEquals("Get second node added",'c',tree.returnKey(tree.head.children.get(0).children.get(0)));
        tree.addNode('d',4,tree.head);
        assertEquals("Get first node added",'d',tree.returnKey(tree.head.children.get(1)));
    }

    @Test
    public void testFind(){
        LCADAG tree = new LCADAG();
        tree.createHead(1,'a');
        assertEquals("Find head",'a',tree.returnKey(tree.findNode('a')));
        tree.addNode('b',2,tree.head);
        assertEquals("Find new Node",'b',tree.returnKey(tree.findNode('b')));
        tree.addNode('c',2,tree.head.children.get(0));
        assertEquals("Find new Node",'c',tree.returnKey(tree.findNode('c')));
    }

    @Test
    public void testLCA(){
        LCADAG tree = new LCADAG();
        tree.createHead(1,'a');
        tree.addNode('b', 2, tree.head);
        tree.addNode('c', 3, tree.head);
        assertEquals("Check simple LCA", 'a', tree.returnKey(tree.LCA(tree.head, tree.head.children.get(0), tree.head.children.get(1))));
        tree.addNode('d', 4, tree.head.children.get(0));
        tree.addNode('e', 5, tree.head.children.get(0));
        assertEquals("Check simple LCA", 'b', tree.returnKey(tree.LCA(tree.head, tree.head.children.get(0).children.get(0), tree.head.children.get(0).children.get(1))));
    }

}