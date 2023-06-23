import { world, World, system, ItemStack } from "@minecraft/server";

export class Timer {
    static EverySeconds(time, method, obj = null){
        let startingTime = world.getTime();
        let endTime = startingTime + (20*time);
        let arg = {
            object: obj,
            timeLast: time
        };

        let id = system.runInterval((a)=>{
            method(arg);
            arg.timeLast -= 1;

        }, 20);

        system.runTimeout(()=>{
            system.clearRun(id);
        }, (time*20));
    }

    static When(time, obj, method) {

        system.runTimeout(()=>{
            method(obj);
        }, (time*20));
    }
}