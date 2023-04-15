import { CaretLeft, X } from "@phosphor-icons/react";
import moment from "moment";
import { ChangeEvent, FC, useState } from "react";
import { PatternFormat } from "react-number-format";
import Image from "next/image";
import bannerAnizia from "../assets/banner.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

enum CurrentsForm {
	none,
	place,
	city,
	therapy,
	date,
	contact,
}

interface IDataForm {
	lugar: string;
	cidade: string;
	terapias: string[];
	data: string;
	contato: string;
}

const App: FC = () => {
	
	const [currentForm, setCurrentForm] = useState(CurrentsForm.none);
	const [isScheduled, setIsScheduled] = useState(false);

	const [data, setData] = useState<IDataForm>({
		lugar: "",
		cidade: "",
		terapias: [],
		data: "",
		contato: ""
	});

	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [city, setCity] = useState("");
	const [contact, setContact] = useState("");
	const [therapys, setTherapys] = useState<string[]>([]);

	const checkNumberContact = (): boolean => {
		const regexDigits = /\d/g;

		let numbersContact = contact.match(regexDigits);

		if(numbersContact?.length === 11) return true;

		return false;
	}

	const handleClickBack = () => {
		let currentsForm = [
			CurrentsForm.place,
			CurrentsForm.therapy,
			CurrentsForm.date,
			CurrentsForm.contact
		];

		if(data.lugar === "em casa") currentsForm.splice(1, 0, CurrentsForm.city);

		let index = currentsForm.indexOf(currentForm);
		if(index > 0) {
			setCurrentForm(currentsForm[index - 1]);
		}
	};

	const closeForm = () => {
		setCurrentForm(CurrentsForm.none);
	};

	const checkIncludeTherapy = (itemTherapy: string): boolean => {
		return therapys.some(therapy => therapy === itemTherapy);
	};

	const newSchedule = () => {
		setData({
			lugar: "",
			cidade: "",
			terapias: [],
			data: "",
			contato: ""
		});
		setIsScheduled(false);
	};

	const handleChangeTherapy = (therapy: string) => {
		let therapyIndex = therapys.indexOf(therapy);
		let updateTherapys = therapys;

		if (therapyIndex > -1) {
			updateTherapys = updateTherapys.filter((therapyItem, index) => index !== therapyIndex);
			setTherapys([...updateTherapys]);
			return;
		}

		setTherapys([...updateTherapys, therapy]);
	};

	const handleChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
		let valueDate = event.target.value;

		if(valueDate) {
			setDate(valueDate);
			return;
		}
		
		setDate("");
	};

	const handleChangeTime = (event: ChangeEvent<HTMLInputElement>) => {
		let valueTime = event.target.value;

		if(valueTime) {
			setTime(valueTime);
			return;
		}
		
		setDate("");
	};

	const handleClickCity = () => {
		setData({...data, cidade: city});
		setCurrentForm(CurrentsForm.therapy);
	};

	const handleClickTherapy = () => {
		setData({...data, terapias: therapys});
		setCurrentForm(CurrentsForm.date);
	};

	const handleChangeContact = (event: ChangeEvent<HTMLInputElement>) => {
		let valueContact = event.target.value;

		setContact(valueContact);
	};

	const handleClickPlace = (place: string) => {
		switch(place) {
			case "at-home":
				setData({...data, lugar: "em casa"});
				setCurrentForm(CurrentsForm.city);
				break;
			
			case "in-clinic":
				setData({...data, lugar: "no consultório"});
				setCurrentForm(CurrentsForm.therapy);
				break;
		}
	};

	const handleClickDate = () => {
		if(date) {

			let valueDate = moment(date).format("DD/MM/YYYY");

			let datetime = valueDate + " " + time;
			setData({...data, data: datetime});
			setCurrentForm(CurrentsForm.contact);
		}
	};

	const handleClickContact = () => {
		setData({...data, contato: contact});
		setIsScheduled(true);
		closeForm();
	};

	return (
		<div className="flex flex-row md:bg-green-50 md:p-5">
			<div className={`bg-green-100 ${currentForm === CurrentsForm.none ? "block" : "hidden"} md:block md:w-2/3 md:mr-5 overflow-x-hidden`}>
				<Image
					src={bannerAnizia}
					alt="Banner da Anizia Cassiano"
					className="w-full object-contain md:h-[225px]"
				/>

				<div className="w-screen bg-white py-5 mt-20 md:w-full">
					<Swiper
						pagination={true}
						grabCursor={true}
						modules={[EffectFade, Autoplay, Pagination]}
						autoplay={{
							delay: 3000,
							disableOnInteraction: false,
						}}
        				effect={"fade"}
						direction={"vertical"}
						className="h-[150px]"
					>
						<SwiperSlide>
							<div className="px-2 h-full w-full text-center bg-white">
								<p className="md:text-lg">Acupuntura</p>
								<p className="text-sm pt-5 w-4/5 mx-auto md:mx-auto md:text-base">A acupuntura é um método terapêutico que consiste na estimulação, por meio de agulhas, de pontos específicos da pele.</p>
							</div>
						</SwiperSlide>

						<SwiperSlide>
							<div className="px-2 h-full w-full text-center bg-white">
								<p className="md:text-lg">Reflexologia</p>
								<p className="text-sm pt-5 w-4/5 mx-auto md:mx-auto md:text-base">A acupuntura é um método terapêutico que consiste na estimulação, por meio de agulhas, de pontos específicos da pele.</p>
							</div>
						</SwiperSlide>

						<SwiperSlide>
							<div className="px-2 h-full w-full text-center bg-white">
								<p className="md:text-lg">Massagem</p>
								<p className="text-sm pt-5 w-4/5 mx-auto md:mx-auto md:text-base">A acupuntura é um método terapêutico que consiste na estimulação, por meio de agulhas, de pontos específicos da pele.</p>
							</div>
						</SwiperSlide>

						<SwiperSlide>
							<div className="px-2 h-full w-full text-center bg-white">
								<p className="md:text-lg">Floral de bach</p>
								<p className="text-sm pt-5 w-4/5 mx-auto md:mx-auto md:text-base">A acupuntura é um método terapêutico que consiste na estimulação, por meio de agulhas, de pontos específicos da pele.</p>
							</div>
						</SwiperSlide>
					</Swiper>
				</div>

				<div className="py-4 mt-20 bg-green-700 flex justify-center items-center text-center font-light">
					<p className="text-white">Atendimento no consultório ou na sua residência</p>
				</div>

				<div className="mt-20">
					<span className="block w-1/2 mx-auto h-[2px] bg-green-700" />

					<div className="pt-5 text-center">
						<h5 className="text-lg">Anizia Cassiano Neves</h5>
						<p className="px-4 pt-1 text-sm italic">Transformar o sofrimento em mecanismo de crescimento humano é o que faz da medicina uma arte. Sou médico por desejo de cuidar e fazer bem a quem sofre.</p>
					</div>
					
					<div className="pb-5 px-5 pt-8">
						<h5 className="text-lg">Formação</h5>
						<ul className="pl-4 list-inside list-disc text-sm">
							<li className="py-1">BIOMEDICINA 4/8</li>
							<li className="py-1">MTC - Acupuntura</li>
							<li className="py-1">Radiliogia</li>
							<li className="py-1">Massoterapia</li>
							<li className="py-1">Terapeuta Holística e Floral</li>
						</ul>
					</div>

					<span className="block w-1/2 mx-auto h-[2px] bg-green-700" />
				</div>

				<div className="mt-20 mb-11 md:mb-0 bg-green-700">
					<p className="text-xl text-white text-center pt-8">Depoimentos</p>

					<Swiper
						modules={[Autoplay]}
						className="w-screen h-[100px] md:w-full"
						autoplay={{
							delay: 2500,
							disableOnInteraction: false,
						}}
					>
						<SwiperSlide>
							<div className="h-full flex flex-col justify-center items-center gap-6 text-center px-4 text-white font-light">
								<p className="text-sm italic">Foi uma noite de sono excelente!!!<br/>A dor na cervical foi alivio imediato. Até meu humor e disposição estão melhores</p>
							</div>
						</SwiperSlide>

						<SwiperSlide className="text-center text-white flex justify-center items-center">
							<div className="h-full flex flex-col justify-center items-center gap-6 text-center px-4 text-white font-light">
								<p className="text-sm italic">Foi uma noite de sono excelente!!!<br/>A dor na cervical foi alivio imediato. Até meu humor e disposição estão melhores</p>
							</div>
						</SwiperSlide>

						<SwiperSlide className="text-center text-white flex justify-center items-center">
							<div className="h-full flex flex-col justify-center items-center gap-6 text-center px-4 text-white font-light">
								<p className="text-sm italic">Foi uma noite de sono excelente!!!<br/>A dor na cervical foi alivio imediato. Até meu humor e disposição estão melhores</p>
							</div>
						</SwiperSlide>

						<SwiperSlide className="text-center text-white flex justify-center items-center">
							<div className="h-full flex flex-col justify-center items-center gap-6 text-center px-4 text-white font-light">
								<p className="text-sm italic">Foi uma noite de sono excelente!!!<br/>A dor na cervical foi alivio imediato. Até meu humor e disposição estão melhores</p>
							</div>
						</SwiperSlide>

						<SwiperSlide className="text-center text-white flex justify-center items-center">
							<div className="h-full flex flex-col justify-center items-center gap-6 text-center px-4 text-white font-light">
								<p className="text-sm italic">Foi uma noite de sono excelente!!!<br/>A dor na cervical foi alivio imediato. Até meu humor e disposição estão melhores</p>
							</div>
						</SwiperSlide>

						<SwiperSlide className="text-center text-white flex justify-center items-center">
							<div className="h-full flex flex-col justify-center items-center gap-6 text-center px-4 text-white font-light">
								<p className="text-sm italic">Foi uma noite de sono excelente!!!<br/>A dor na cervical foi alivio imediato. Até meu humor e disposição estão melhores</p>
							</div>
						</SwiperSlide>

						<SwiperSlide className="text-center text-white flex justify-center items-center">
							<div className="h-full flex flex-col justify-center items-center gap-6 text-center px-4 text-white font-light">
								<p className="text-sm italic">Foi uma noite de sono excelente!!!<br/>A dor na cervical foi alivio imediato. Até meu humor e disposição estão melhores</p>
							</div>
						</SwiperSlide>

						<SwiperSlide className="text-center text-white flex justify-center items-center">
							<div className="h-full flex flex-col justify-center items-center gap-6 text-center px-4 text-white font-light">
								<p className="text-sm italic">Foi uma noite de sono excelente!!!<br/>A dor na cervical foi alivio imediato. Até meu humor e disposição estão melhores</p>
							</div>
						</SwiperSlide>

						<SwiperSlide className="text-center text-white flex justify-center items-center">
							<div className="h-full flex flex-col justify-center items-center gap-6 text-center px-4 text-white font-light">
								<p className="text-sm italic">Foi uma noite de sono excelente!!!<br/>A dor na cervical foi alivio imediato. Até meu humor e disposição estão melhores</p>
							</div>
						</SwiperSlide>
					</Swiper>
				</div>

				<button onClick={() => setCurrentForm(CurrentsForm.place)} className="w-full h-11 fixed bottom-0 z-10 mt-10 bg-cyan-600 text-slate-200 font-medium md:hidden md:mt-0">Marque sua consulta</button>
			</div>
			
			<div className={`w-full ${currentForm === CurrentsForm.none ? "hidden" : "flex flex-col"} md:bg-white md:rounded-t-md md:flex md:flex-col md:w-1/3`}>
				<div className="bg-cyan-600 flex flex-row justify-between p-3 md:rounded-t-md">
					<CaretLeft
						size={24}
						weight="light"
						onClick={handleClickBack}
						className={`
							text-slate-200
							${currentForm === CurrentsForm.place ? "invisible" : ""}
							md:hidden
							cursor-pointer
						`}
					/>
					<h5 className="text-slate-200">Marque sua consulta</h5>
					<X size={24} weight="light" onClick={() => closeForm()} className="text-slate-200 cursor-pointer md:hidden" />
				</div>

				{isScheduled ? (
					<div className="p-5 text-center">
						<p>Muito obrigado pela confiança, entraremos em contato!!</p>
						<button onClick={newSchedule} className="mt-7 h-10 cursor-pointer bg-cyan-600 text-white rounded-md hover:drop-shadow-md md:px-3 md:text-sm">Agendar novamente</button>
					</div>
				) : (
					<form className="grow p-6">
						<div className={`${currentForm !== CurrentsForm.place ? "hidden" : ""} md:block`}>
							<label className="md:text-neutral-600">Local de atendimento:</label>
	
							<div className="flex flex-col gap-4 p-2 mt-4 md:flex-row md:justify-center">
								<input
									type="button"
									value="em casa"
									onClick={() => handleClickPlace("at-home")}
									className={`${data.lugar === "em casa" ? "bg-cyan-800 drop-shadow-md" : ""} h-10 cursor-pointer bg-cyan-600 text-white rounded-md hover:drop-shadow-md md:px-3 md:text-sm`}
								/>
	
								<input
									type="button"
									value="no consultório"
									onClick={() => handleClickPlace("in-clinic")}
									className={`${data.lugar === "no consultório" ? "bg-cyan-800 drop-shadow-md" : ""} h-10 cursor-pointer bg-cyan-600 text-white rounded-md hover:drop-shadow-md md:px-3 md:text-sm`}
								/>
							</div>
						</div>
	
						<div className={`${currentForm !== CurrentsForm.city ? "hidden" : ""} md:block md:pt-6`}>
							<div>
								<label htmlFor="city" className="md:text-neutral-600">Selecione sua cidade:</label>
	
								<div className="flex justify-center md:justify-start">
									<select onChange={(event) => setCity(event.target.value)} id="city" className="w-56 flex flex-col gap-4 p-2 mt-4 border-solid border-2 rounded-md">
										<option value="">selecione</option>
										<option value="ceilandia">Ceilândia</option>
										<option value="samambaia">Samambaia</option>
										<option value="plano-piloto">Plano Piloto</option>
										<option value="taguatinga">Taguatinga</option>
										<option value="planaltina">Planaltina</option>
										<option value="guara">Guará</option>
										<option value="gama">Gama</option>
										<option value="recanto-emas">Recanto das Emas</option>
										<option value="santa-maria">Santa Maria</option>
										<option value="aguas-claras">Águas Claras</option>
										<option value="sao-sebastiao">São Sebastião</option>
										<option value="riacho-fundo-ii">Riacho Fundo II</option>
										<option value="sol-nascente_por-sol">Sol Nascente/Pôr do Sol</option>
										<option value="sobradinho-ii">Sobradinho II</option>
										<option value="sobradinho">Sobradinho</option>
										<option value="vicente-pires">Vicente Pires</option>
										<option value="paranoa">Paranoá</option>
										<option value="itapoa">Itapoã</option>
										<option value="sudoeste_octogonal">Sudoeste/Octogonal</option>
										<option value="brazlandia">Brazlândia</option>
										<option value="jardim-botanico">Jardim Botânico</option>
										<option value="riacho-fundo">Riacho Fundo</option>
										<option value="arniqueira">Arniqueira</option>
										<option value="lago-norte">Lago Norte</option>
										<option value="scia">SCIA</option>
										<option value="cruzeiro">Cruzeiro</option>
										<option value="lago-sul">Lago Sul</option>
										<option value="nucleo-bandeirante">Núcleo Bandeirante</option>
										<option value="park-way">Park Way</option>
										<option value="candangolandia">Candangolândia</option>
										<option value="varjao">Varjão</option>
										<option value="fercal">Fercal</option>
										<option value="sia">SIA</option>
										<option value="outro">Outro</option>
									</select>
								</div>
							</div>
	
							<div className="flex justify-center p-2 mt-4 md:hidden">
								<button
									onClick={handleClickCity}
									type="button"
									disabled={city === "" ? true : false}
									className="h-8 w-56 bg-cyan-600 text-slate-200 rounded-md disabled:bg-neutral-400"
								>próximo</button>
							</div>
						</div>
	
						<div className={`${currentForm !== CurrentsForm.therapy ? "hidden" : ""} md:block md:pt-6`}>
							<label className="md:text-neutral-600">Selecione as terapias:</label>
	
							<ul className="h-80 flex flex-col p-2 mt-4 divide-y overflow-y-auto text-center">
								<li className={checkIncludeTherapy("Bandagem") ? "bg-blue-200" : ""}>
									<button type="button" onClick={() => handleChangeTherapy("Bandagem")} className="w-full py-3 grow">Bandagem</button>
								</li>
								
								<li className={checkIncludeTherapy("Acupuntura") ? "bg-blue-200" : ""}>
									<button type="button" onClick={() => handleChangeTherapy("Acupuntura")} className="w-full py-3 grow">Acupuntura</button>
								</li>
								
								<li className={checkIncludeTherapy("Moxaterapia") ? "bg-blue-200" : ""}>
									<button type="button" onClick={() => handleChangeTherapy("Moxaterapia")} className="w-full py-3 grow">Moxaterapia</button>
								</li>
								
								<li className={checkIncludeTherapy("Reflexologia") ? "bg-blue-200" : ""}>
									<button type="button" onClick={() => handleChangeTherapy("Reflexologia")} className="w-full py-3 grow">Reflexologia</button>
								</li>
								
								<li className={checkIncludeTherapy("Floral de bach") ? "bg-blue-200" : ""}>
									<button type="button" onClick={() => handleChangeTherapy("Floral de bach")} className="w-full py-3 grow">Floral de bach</button>
								</li>
								
								<li className={checkIncludeTherapy("Auriculoterapia") ? "bg-blue-200" : ""}>
									<button type="button" onClick={() => handleChangeTherapy("Auriculoterapia")} className="w-full py-3 grow">Auriculoterapia</button>
								</li>
								
								<li className={checkIncludeTherapy("Ventosaterapia") ? "bg-blue-200" : ""}>
									<button type="button" onClick={() => handleChangeTherapy("Ventosaterapia")} className="w-full py-3 grow">Ventosaterapia</button>
								</li>
								
								<li className={checkIncludeTherapy("Pós-operatório") ? "bg-blue-200" : ""}>
									<button type="button" onClick={() => handleChangeTherapy("Pós-operatório")} className="w-full py-3 grow">Pós-operatório</button>
								</li>
								
								<li className={checkIncludeTherapy("Limpeza de pele") ? "bg-blue-200" : ""}>
									<button type="button" onClick={() => handleChangeTherapy("Limpeza de pele")} className="w-full py-3 grow">Limpeza de pele</button>
								</li>
								
								<li className={checkIncludeTherapy("Massagem - Tui Na") ? "bg-blue-200" : ""}>
									<button type="button" onClick={() => handleChangeTherapy("Massagem - Tui Na")} className="w-full py-3 grow">Massagem - Tui Na</button>
								</li>
								
								<li className={checkIncludeTherapy("Acupuntura estética") ? "bg-blue-200" : ""}>
									<button type="button" onClick={() => handleChangeTherapy("Acupuntura estética")} className="w-full py-3 grow">Acupuntura estética</button>
								</li>
								
								<li className={checkIncludeTherapy("Liberação miofascial") ? "bg-blue-200" : ""}>
									<button type="button" onClick={() => handleChangeTherapy("Liberação miofascial")} className="w-full py-3 grow">Liberação miofascial</button>
								</li>
								
								<li className={checkIncludeTherapy("Massagem - Drenagem linfática") ? "bg-blue-200" : ""}>
									<button type="button" onClick={() => handleChangeTherapy("Massagem - Drenagem linfática")} className="w-full py-3 grow">Massagem - Drenagem linfática</button>
								</li>
								
								<li className={checkIncludeTherapy("Massagem - Pedras quentes vulcânicas") ? "bg-blue-200" : ""}>
									<button type="button" onClick={() => handleChangeTherapy("Massagem - Pedras quentes vulcânicas")} className="w-full py-3 grow">Massagem - Pedras quentes vulcânicas</button>
								</li>
							</ul>
	
							<div className="flex justify-center p-2 mt-4 md:hidden">
								<button
									onClick={() => handleClickTherapy()}
									type="button"
									disabled={therapys.length === 0 ? true : false}
									className="h-8 w-56 bg-cyan-600 text-slate-200 rounded-md disabled:bg-neutral-400"
								>próximo</button>
							</div>
						</div>
	
						<div className={`${currentForm !== CurrentsForm.date ? "hidden" : ""} md:block md:pt-6`}>
							<label className="md:text-neutral-600">Horário de preferência:</label>
	
							<div className="flex items-center flex-col p-2 mt-4 md:flex-row md:gap-2 md:justify-start">
								<input type="date" onChange={handleChangeDate} value={date} className="p-2 border-solid border-2 rounded-md" />
	
								<input type="time" onChange={handleChangeTime} value={time} className="mt-6 p-2 border-solid border-2 rounded-md md:mt-0" />
							</div>
	
							<div className="flex justify-center p-2 mt-4 md:hidden">
								<button
									onClick={() => handleClickDate()}
									type="button"
									disabled={date === "" ? true : false}
									className="h-8 w-56 bg-cyan-600 text-slate-200 rounded-md disabled:bg-neutral-400"
								>próximo</button>
							</div>
						</div>
	
						<div className={`${currentForm !== CurrentsForm.contact ? "hidden" : ""} md:block md:pt-6`}>
							<div>
								<label htmlFor="phone" className="md:text-neutral-600">WhatsApp para contato:</label>
	
								<div className="flex justify-center md:justify-start">
									<PatternFormat
										format="(##) # ####-####"
										type="text"
										id="phone"
										placeholder="(61) 9 9999-9999"
										className="w-56 flex flex-col gap-4 p-2 mt-4 border-solid border-2 rounded-md"
										onChange={handleChangeContact}
										value={contact}
									/>
								</div>
							</div>
	
							<div className="flex flex-col items-center gap-2 p-2 mt-11">
								<button
									onClick={() => handleClickContact()}
									type="button"
									disabled={!checkNumberContact()}
									className="h-8 w-56 bg-cyan-600 text-slate-200 rounded-md disabled:bg-neutral-400 hover:drop-shadow-md"
								>terminar</button>
								<p className="w-56 text-sm italic md:w-auto">Entrarei em contato pelo número do seu celular.</p>
							</div>
						</div>
					</form>
				)}
			</div>
		</div>
	)
}

export default App;
