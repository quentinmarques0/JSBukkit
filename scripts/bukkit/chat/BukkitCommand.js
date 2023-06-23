import { world } from "@minecraft/server";
import { BukkitChat } from "./bukkitChat";
import { BukkitPlayer } from "../entities/player";
import { Permission } from "../permissions/permissions";
import { Color } from "../enum/minecraft";

export class BukkitCommand {

    static Commands = [];

    /**
    * On player write command to chat.
    * @param {ChatSendBeforeEvent} arg The chat sent informations.
    * @return {void} Return nothing
    */
    static CommandCallback(arg) {
        let message = arg.message;
        let sendToTargets = arg.sendToTargets;
        let sender = arg.sender;
        let targets = arg.getTargets();

        let message_split = message.split(" ");
        let command = { 
            input: message_split[0], 
            parameters: message_split,
            sender: BukkitPlayer.Create(sender.name)
        };

        for (const key in BukkitCommand.Commands) {
            if (Object.hasOwnProperty.call(BukkitCommand.Commands, key)) {
                const stockInput = BukkitCommand.Commands[key].input;
                const _commands = BukkitCommand.Commands[key].command;
                if(command.input == stockInput) {
                    if(_commands.enabled != false){
                        if(_commands.operator != undefined)
                        {
                            if(_commands.operator == true && sender.isOp()){
                                BukkitCommand.Commands[key].method(command);
                            }
                            else {
                                if(_commands.permission <= Permission.GetIndex(command.sender) )
                                {
                                    BukkitCommand.Commands[key].method(command);
                                }
                            }
                        }
                        else {
                            if(_commands.permission == undefined){
                                BukkitCommand.Commands[key].method(command);
                            }
                            else if(_commands.permission <= Permission.GetIndex(command.sender) || (_commands.operator == true && command.sender.isOp() == true)) BukkitCommand.Commands[key].method(command);

                            else command.sender.sendTo(`${Color.RED}You don't have the permission to use this command.`);   
                        }

                        arg.cancel = true;
                    }
                }
            }
        }

        if(arg.cancel != true) {
            BukkitChat.onEntitySendChat(arg);
        }
    }
    /**
    * Reset callbacks, when we put a new entry.
    * @return {void} Return nothing
    */
    static ResetCallback() {
        world.beforeEvents.chatSend.unsubscribe(BukkitCommand.CommandCallback);
        
        world.beforeEvents.chatSend.subscribe(BukkitCommand.CommandCallback);
    }
    /**
    * Register a command
    * @param {Object} command The command object to register a command prefix, and permissions.
    * @param {function} func The callback to run on player write the command.
    * @return {void} Return nothing
    */
    static Register(command, func) {
        BukkitCommand.Commands.push({
            input: command.cmd.toString(), 
            command: command,
            method: func
        });

        BukkitCommand.ResetCallback();
    }
}