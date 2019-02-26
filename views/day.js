function day(date, events) {
    return `
        <div class="Day">
            <h3>${date}</h3>
            <!-- <hr> -->
            <div class="events">
                <h3>Events</h3>
                <ul class="Events">
                    ${events}
                </ul>
            </div>
        </div>
    `
}

module.exports = day