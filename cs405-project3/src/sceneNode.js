/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(parentMvp, parentModelView, parentNormalMatrix, parentModelMatrix) {
        
        var combinedModelView = parentModelView;
        var combinedMvp = parentMvp;
        var combinedNormalMatrix = parentNormalMatrix;
        var combinedModel = parentModelMatrix;

       
        var transformationMatrix = this.trs.getTransformationMatrix();

        
        combinedModel = MatrixMult(parentModelMatrix, transformationMatrix);
        combinedModelView = MatrixMult(parentModelView, transformationMatrix);
        combinedMvp = MatrixMult(parentMvp, transformationMatrix);
        combinedNormalMatrix = MatrixMult(parentNormalMatrix,transformationMatrix);  

        
        if (this.meshDrawer) {
            this.meshDrawer.draw(combinedMvp, combinedModelView, combinedNormalMatrix, combinedModel);
        }

        
        for (let child of this.children) {
            child.draw(combinedMvp, combinedModelView, combinedNormalMatrix, combinedModel);
        }
    }
    

    

}

