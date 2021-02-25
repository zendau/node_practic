function render_page(content = []) {
    console.log(content)
    return `
    <form action="/upload" method="post" enctype="multipart/form-data">
        <label>Файл</label><br>
        <input type="hidden" name="_csrf" value=${content[0]}>
        <input type="file" name="filedata" /><br><br>
        <input type="submit" value="Send" />
    </form>
    <h1>Imgs</h1>
    ${render_img(content[1])}
    `
}

function render_img(arr) {
    const html = []
    console.log(arr)
    arr.forEach(item => {
        html.push(
            /*html*/`
            <img src="${item}" alt="">
            `)
    });
    console.log(html)
    return html.join("")
}

module.exports = {
    render_page
}