class Connect{
    constructor(bodyA, bodyB){
        var lasthope = bodyA.body.bodies.length - 2;
        this.connect = Constraint.create({
            bodyA: bodyA.body.bodies[lasthope],
            pointA: {x:0,y:0},
            bodyB: bodyB,
            pointB: {x:0,y:0},
            length: -10,
            stiffness: 0.01,
        })
        World.add(engine.world, this.connect);
    }
    
  noConnect(){
    World.remove(engine.world, this.connect);
  }      
}
