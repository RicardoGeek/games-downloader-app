$(async function() {
    let backendEndpoint = 'http://localhost:8888/games'

    await fetch('http://api.nabulabs.com/sopes2/backend.json')
        .then(response => response.json())
        .then(data => {
            backendEndpoint = data.endpoint
        })

    const bidnClicks = () => {
        $(".download").click(function() {
            const gameName = $(this).data('name')
            const gameId = $(this).data('id')
            const downloadCount = $(`#${gameId}`).text()
            console.log(downloadCount)
            const next = parseInt(downloadCount) + 1
            console.log(next)

            $.ajax({
                url: backendEndpoint,
                method: 'PATCH',
                data: {
                    name: gameName,
                    downloads: next
                }
            }).done(function() {
                window.location.reload()
            })
        })


        $(".delete").click(function() {
            const gameId = $(this).data('id')

            $.ajax({
                url: backendEndpoint,
                method: 'DELETE',
                data: {
                    _id: gameId
                }
            }).done(function() {
                window.location.reload()
            })
        })
    }
    
    await $.ajax(backendEndpoint).done(function(response) {
        response.forEach((game) => {

            $("#games-table").append(`
                <tr>
                    <td>${game.name}</td>
                    <td id="${game._id}">${game.downloads}</td>
                    <td>
                        <button data-id="${game._id}" data-name="${game.name}" class="btn btn-success download">Download</button>
                    </td>
                    <td>
                        <button data-id="${game._id}" class="btn btn-danger delete">Delete</button>
                    </td>
                </tr>
            `)
        })
        
        bidnClicks()
    })

    $("#create").click(function() {
        const gameName = $("#game-name").val()

        $.ajax({
            url: backendEndpoint,
            method: 'POST',
            data: {
                name: gameName,
                downloads: 0
            }
        }).done(function() {
            window.location.reload()
        })
    })

})