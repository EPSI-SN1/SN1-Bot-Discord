import {MessageButton} from "discord.js";

export const createRoleButtonGroup1 = new MessageButton({
    type: "BUTTON",
    label: "GROUPE 1",
    customId: "group1",
    style: "PRIMARY"
}) as MessageButton;

export const createRoleButtonGroup2 = new MessageButton({
    type: "BUTTON",
    label: "GROUPE 2",
    customId: "group2",
    style: "PRIMARY"
}) as MessageButton;


