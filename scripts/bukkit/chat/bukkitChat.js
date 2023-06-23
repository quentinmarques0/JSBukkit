import { world } from "@minecraft/server";
import { configuration } from "../config";
//Export the class to use it on other files.
//On exporte la class pour l'utiliser dans d'autre fichiers.
export class BukkitChat {
    static Override = null;
    //arg = ChatSendBeforeEvent
    static onEntitySendChat(arg) {
        let message = arg.message;
        let sendToTargets = arg.sendToTargets;
        let sender = arg.sender;
        let targets = arg.getTargets();

        if(BukkitChat.Override == null) {
            world.sendMessage(`${
                configuration.bukkit.chat.syntax
                .replace(/<player>/g, sender.name)
                .replace(/<message>/g, message)
            }`);
        }
        else
        {
            BukkitChat.Override(arg);
        }

        //We will not display the message of the player from the player.
        //Nous n'afficherons pas le message du joueur par le joueur.
        arg.cancel = true;
    }

    static sendTo(entity, message){
        const dim = world.getDimension("overworld");

        dim.runCommandAsync(`tellraw ${entity.name} {"rawtext":[{"text":"${message}"}]}`);
    }
}