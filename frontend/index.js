console.log("hello world!")
const apiAddress = 'https://us-central1-consulta-assinecar.cloudfunctions.net/app/api/read'

document.getElementById("button").onclick = event => {
    pesquisa = document.getElementById('modelo').value.toUpperCase()
    conteudo = document.getElementById('conteudo')
    lista=""
    event.preventDefault()
    conteudo.innerHTML = `<img src="./load.gif"></img>`
    fetch(apiAddress)
    .then(resp => resp.json())
    .then(obj => [...obj])
    .then(carros => carros.filter(carro => carro.modelo.toUpperCase().includes(pesquisa)))
    .then(carros => carros.sort((c1,c2) => c1.modelo.localeCompare(c2.modelo)))
    .then(carros => {
        carros.forEach(carro => {
            lista = lista.concat(`<li><a href="${apiAddress}/${carro.id}">${carro.modelo}</a></li>`)
        })
        conteudo.innerHTML = lista == '' ? '<ul><li>Ops... Nenhum resultado!</li></ul>': `<ul>${lista}</ul>`
        return [...document.getElementsByTagName('a')]
    })
    .then(links => links.forEach(link =>{
        link.onclick = event =>{
            event.preventDefault()
            fetch(link.href)
            .then(resp => resp.json())
            .then(resp => {
                return `<h1>${resp.modelo}</h1>
                <div class="precos"><span class=titulo>12 meses:</span>
                <ul><li>500 km: R$ ${resp['500x12']}</li>
                <li>1000 km: R$ ${resp['1000x12']}</li>
                <li>1500 Km: R$ ${resp['1500x12']}</li>
                <li>2000 Km: R$ ${resp['2000x12']}</li>
                <li>2500 Km: R$ ${resp['2500x12']}</li>
                <li>3000 Km: R$ ${resp['3000x12']}</li></ul></div>
                <div class="precos"><span class=titulo>24 meses:</span>
                <ul><li>500 km: R$ ${resp['500x24']}</li>
                <li>1000 km: R$ ${resp['1000x24']}</li>
                <li>1500 Km: R$ ${resp['1500x24']}</li>
                <li>2000 Km: R$ ${resp['2000x24']}</li>
                <li>2500 Km: R$ ${resp['2500x24']}</li>
                <li>3000 Km: R$ ${resp['3000x24']}</li></ul></div>
                <div class="precos"><span class=titulo>36 meses:</span>
                <ul><li>500 km: R$ ${resp['500x36']}</li>
                <li>1000 km: R$ ${resp['1000x36']}</li>
                <li>1500 Km: R$ ${resp['1500x36']}</li>
                <li>2000 Km: R$ ${resp['2000x36']}</li>
                <li>2500 Km: R$ ${resp['2500x36']}</li>
                <li>3000 Km: R$ ${resp['3000x36']}</li></ul></div>`
            })
         .then(dados => conteudo.innerHTML = dados)
        }
    }))
}
