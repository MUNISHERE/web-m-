document.addEventListener('DOMContentLoaded', () => {
    const iconOptions = document.querySelectorAll('.icon-option');

    if (iconOptions.length === 0) {
        console.error('No icon options found. Make sure the elements with class "icon-option" exist.');
        return;
    }

    iconOptions.forEach(item => {
        item.addEventListener('click', event => {
            // Hiển thị màn hình GIF
            const displayScreen = document.getElementById('displayScreen');
            const displayGif = document.getElementById('displayGif');
            const displayVideo = document.getElementById('displayVideo');

            if (!displayScreen || !displayGif || !displayVideo) {
                console.error('One or more elements with IDs "displayScreen", "displayGif", or "displayVideo" are missing.');
                return;
            }

            // Ẩn các tùy chọn icon
            const container = document.querySelector('.container');
            if (container) {
                container.style.display = 'none';
            } else {
                console.error('Element with class "container" not found.');
                return;
            }

            // Lấy GIF tương ứng với icon được chọn
            const selectedGif = item.getAttribute('data-gif');
            if (!selectedGif) {
                console.error('Selected GIF not found.');
                return;
            }

            displayGif.src = selectedGif;
            displayGif.style.display = 'block';
            displayVideo.style.display = 'none';
            displayScreen.style.display = 'flex';

            // Chạy GIF toàn màn hình trong 5 giây
            setTimeout(() => {
                // Ẩn GIF và hiển thị video ngẫu nhiên
                displayGif.style.display = 'none';
                displayVideo.style.display = 'block';

                // Chọn video ngẫu nhiên từ danh sách ứng với icon được chọn
                const videos = JSON.parse(item.getAttribute('data-videos'));
                if (!videos || videos.length === 0) {
                    console.error('Videos not found or empty.');
                    return;
                }

                const randomVideo = videos[Math.floor(Math.random() * videos.length)];
                displayVideo.src = randomVideo;
                displayVideo.load(); // Ensure the video is loaded
                displayVideo.play(); // Start playing the video
            }, 5000);
        });
    });
});
