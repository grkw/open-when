import Link from 'next/link';

export default function LetterEditor() {
    return (<form className="form-module">
        your info: these will show up on the letter
        name <input id="authorname" minLength={0} maxLength={25} placeholder='ex. "Grace", "ya girl", "supportive carrot"'></input>
        where you're writing from <input id="authorlocation" minLength={0} maxLength={25} placeholder='ex. "NYC", "under a blanket", "the other side")'></input>
        your letter <textarea id="letter" minLength={100} maxLength={2000} placeholder="enter your letter!"></textarea>
        <input type="submit" value="submit"></input>

        who is this letter for?
        <div>
            <label>
                <input type="radio" name="recipient" value="myself" />
                myself
            </label>
            <label>
                <input type="radio" name="recipient" value="someone else" />
                someone else
            </label>
        </div>

        <button className="custom-button-class"><Link href='/write_letter'>submit</Link></button>
    </form>)
}