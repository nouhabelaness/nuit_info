import { Component, ChangeDetectorRef, Inject } from '@angular/core'
import e from '../event-bus'

@Component({
  selector: 'AngularApp',
  template: `
		<div style="margin-top: 100px;">
      <h1>This was written in Angular</h1>
      <p>{{message}}</p>
      <p>{{message2}}</p>
		</div>
	`,
})
export default class AngularApp {
  message: string = "Hello From Angular"
  message2: string = "select from joueur where id =1"

  constructor(@Inject(ChangeDetectorRef) private changeDetector: ChangeDetectorRef) {}

  ngAfterContentInit() {
    e.on('message', message => {
      this.message = message.text
      this.changeDetector.detectChanges()
      this.returnMessageToReactWhenReceived()
    })
    e.on('message2', message2 => {
      this.message = message2.text
      this.changeDetector.detectChanges()
      this.returnMessageToReactWhenReceived()
    })
  }

  returnMessageToReactWhenReceived() {
    e.emit('received', { text: 'Woohoo! Hello from Angular! 🎉' })
  }
}
