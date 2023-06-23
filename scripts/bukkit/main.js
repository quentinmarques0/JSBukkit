import { BukkitCommand } from "./chat/BukkitCommand";
import { BukkitChat } from "./chat/bukkitChat";
import { configuration } from "./config";
import { Help } from "./help/base";
import { world, system } from '@minecraft/server';
import { Timer } from "./util/timer";
import { Permission } from "./permissions/permissions";
import { BukkitPlayer } from "./entities/player";

function isSameLocation(a, b) {
    return (a.x.toFixed() == b.x.toFixed() && a.y.toFixed() == b.y.toFixed() && a.z.toFixed() == b.z.toFixed());
}

function strLoc(l) {
    return `(${l.x.toFixed()}, ${l.y.toFixed()}, ${l.z.toFixed()})`;
}

export class Bukkit {

    static init() {
        Help.Add(configuration.bukkit.commands);
        Permission.init();
        //postLoad Callback
        Permission.postload();
        BukkitCommand.Register( configuration.bukkit.commands.help , (arg) => {
            Help.Get().forEach(key => {

                world.sendMessage(key.usage.replace(/<cmd>/g, key.cmd) + " : " + key.description.replace(/<cmd>/g, key.cmd));
            });
        });

        BukkitCommand.Register( configuration.bukkit.commands.spawn, (arg) => { 
            
            let loc = arg.sender.location;

            let instance = {
                last_position: loc,
                player: arg.sender,
                can_tp: true
            };

            Timer.EverySeconds(5, (instance) => {
                
                arg.sender.sendTo(`Teleporting to spawn location in ${instance.timeLast} seconds.`);
                if(!isSameLocation(instance.object.player.location, instance.object.last_position)) {
                    instance.object.can_tp = false;
                }
            }, instance);

            Timer.When(5, instance, (obj)=>{
                if(obj.can_tp != true) {
                    return;
                }

                obj.player.teleport(world.getDefaultSpawnPosition()); 
            });

        });

        BukkitCommand.Register( configuration.bukkit.commands.nick , (arg) => {
            let nickname = arg.parameters[1];

            if(nickname == undefined || nickname == ""){
                let result = arg.sender.setName(arg.sender.name);
                arg.sender.sendTo("Name changed to "+result);
            }
            else
            {
                let result = arg.sender.setName(nickname);
                arg.sender.sendTo("Name changed to "+result);
            }
        });

        //Permission.Set(BukkitPlayer.Create("QuentinFTL"), "vip+");

    }
        
}