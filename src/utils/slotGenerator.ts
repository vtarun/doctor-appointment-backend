export function generateSlots(start: Date, end: Date, slotMinutes = 30){
    const slots: {startTime: Date, endTime: Date}[] = [];
    let currentTime = new Date(start);

    while(currentTime < end){
        const slotEnd = new Date(currentTime.getTime() + (60 * 30 * 1000));
        if(slotEnd <= end){
            slots.push({startTime: start, endTime: slotEnd});
        }
        currentTime = slotEnd;
    }

    return slots;
}