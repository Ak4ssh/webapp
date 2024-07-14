// openTelegramLink showAlert

document.addEventListener('DOMContentLoaded', () => {
    const telegram = window.Telegram.WebApp

    document.getElementById('join-btn').addEventListener('click', () => {
        document.getElementById('join-div').style.display = 'none';
        document.getElementById('loader').style.display = 'flex';


        if (!telegram.isVersionAtLeast('7.6')) {
            telegram.showAlert(`Please update your Telegram app to use TechZMusic. Your current version is ${telegram.version}, but version 7.6 or higher is required.`, callback = () => {
                telegram.close()
            })
        }
        else {
            telegram.ready()
            telegram.expand()
            telegram.setHeaderColor('#000813')
            telegram.setBackgroundColor('#000813')

            const user_id = telegram.initDataUnsafe.user.id
            const group_id = telegram.initDataUnsafe.start_param

            if (group_id === undefined) {
                telegram.showAlert('Use the /join command to join Group Music.', callback = () => {
                    telegram.close()
                })
                return
            }

            telegram.enableClosingConfirmation()
            InitWebsite(user_id, group_id)
        }
    })
})