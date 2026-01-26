export function generateSlots(start: Date, end: Date, slotInterval = 30){
    let slots: {startTime: Date, endTime: Date}[] = [];
    let current = new Date(start);

    while(current < end){
        const slotEnd = new Date(current.getTime() + slotInterval * 60 * 1000);
        if(slotEnd <= end){
            slots.push({startTime: new Date(current), endTime: slotEnd});
        }
        current = slotEnd;
    }

    return slots;
}