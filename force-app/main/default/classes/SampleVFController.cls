public class SampleVFController {

    public PageReference openLightningComponent() {
        
        PageReference pg = new PageReference('/lightning/n/Sample_LWC');
        pg.setRedirect( true );
        pg.getParameters().put('c__strInput','testing');
        return pg;
        
    }
}