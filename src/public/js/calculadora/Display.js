class Display{
    constructor(displayValorAnterior, displayValorActual){
        this.displayValorAnterior = displayValorAnterior;
        this.displayValorActual = displayValorActual;
        this.calculadora = new Calculator();
        this.operador = undefined;
        this.valorActual = '';
        this.valorAnterior = '';
        this.signos = {
            sumar: '+',
            restar: '-',
            dividir: '/',
            multiplicar: '*',
            potenciar: '**'
        }
        this.advancedSignos = {
            raiz: '√'
            //Agregar mas funciones
        }
    }

    addNumber(numero){
        if (numero === '.' && this.valorActual.includes('.')) return
        this.valorActual = this.valorActual.toString() + numero.toString();
        this.printValues();
    }

    printValues(){
        this.displayValorActual.textContent = this.valorActual;
        this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.operador] || this.advancedSignos[this.operador] || ''}`;
    }

    deleteValue(){
        this.valorActual = this.valorActual.toString().slice(0, -1);
        this.printValues();
    }

    deleteAll(){
        this.valorActual = '';
        this.valorAnterior = '';
        this.operador = undefined;
        this.printValues();
    }
    computar(tipo){
        this.operador !== 'igual' && this.calcular(this.verificador);
        this.operador = tipo;
        if (this.operador in this.signos){
            this.operacion = this.signos[this.operador];
            this.verificador = 'basic_operar';
        }
        if (this.operador in this.advancedSignos){
            this.operacion = this.operador;
            this.verificador = 'advanced_operar';
        }
        this.valorAnterior = this.valorActual || this.valorAnterior;
        this.valorActual='';
        this.printValues();
    }

    calcular(x){
        this.funcion = x;
        if((this.valorAnterior !== '')&&(this.valorActual !=='')){
            this.valorActual = this.calculadora[this.funcion](this.valorAnterior, this.valorActual, this.operacion);
            let tbodyCal=document.getElementById('tbody_calculadora')
            let trr=document.createElement('tr')
            let tdNom=document.createElement('td')
            let tdElim=document.createElement('td')

            let inputCal=document.createElement('input')
            inputCal.classList.add("form-control")
            inputCal.classList.add("w-75")
            inputCal.setAttribute('type', 'text')
            inputCal.setAttribute('placeholder','nombre del valor' )
            tdNom.appendChild(inputCal)

            let tdRes=document.createElement('td')
            let label_res=document.createElement('label')
            label_res.textContent=this.valorActual
            tdRes.appendChild(label_res)

            let a=document.createElement('a')
            a.innerHTML=`<span class="material-icons-outlined">delete_outline</span>`
            a.addEventListener('click', (e)=>{
                e.target.parentElement.parentElement.parentElement.remove()
            })
            tdElim.appendChild(a)

            trr.appendChild(tdNom)
            trr.appendChild(tdRes)
            trr.appendChild(tdElim)
            tbodyCal.appendChild(trr)
            console.log('computado', this.valorActual)
        }
    }
}